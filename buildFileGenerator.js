/***************************************************************************************
 * title
 * 	・ビルドファイル生成用スクリプト
 * 
 * description
 *  ・Contents（データ）とhtmlテンプレート（ソース）を元にビルドファイルを生成する
 *    1. ビルド用ディレクトリ作成する
 * 　 2. ビルド用ディレクトリにContentsとhtmlリソースをコピーする
 * 　 3. Contentsに対応するhtmlテンプレートを使って一覧画面のビルドファイルを作成する
 * 　 4. Contentsに対応するhtmlテンプレートを使って説明画面のビルドファイルを作成する
 * 　 5. Contentsに対応するhtmlテンプレートを使って閲覧画面のビルドファイルを作成する
 * 
 ***************************************************************************************/

const fs = require('fs-extra');
const path = require('path');

/*
 * メイン処理  
 */
function start() {
	try {
		// ビルドディレクトリ作成
		createBuildDirectory();
		// Contentsとhtmlリソースコピー
		copyParamaters();
		// メニュー配下のビルドファイル作成
		let menus = ["./contents/Home","./contents/Toolbox Manuals/English", "./contents/Toolbox Manuals/Spanish", "./contents/Toolbox Manuals/Portuguese", "./contents/Solution Link"];
		menus.forEach(menu => { makeContentsList(menu) });
		// ビルドファイルのヘッダ設定
		setDisplayHeader("build");
		// フレームワークソースコピー
		copyFramework();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

/*
 * フレームワークソースのコピー処理
 */
function copyFramework() {

	console.log('copyFramework:start');
	fs.mkdirSync('./dist');
	fs.copyFileSync('./README.md', './dist/README.md');
	fs.readdirSync('./src/framework', { withFileTypes: true }).forEach((content) => {
		if (content.isDirectory() && content.name !== 'framework') {
			copyDirectory(path.join('./src/framework', content.name), path.join('./dist', content.name));
		} else if (content.isFile()) {
			fs.copyFileSync(path.join('./src/framework', content.name), path.join('./dist', content.name));
		}
	});
}

/*
 * ビルドディレクトリ作成処理
 */
function createBuildDirectory() {

	// 不要なビルド結果ファイル削除
	console.log('createBuildDirectory:start');
	const distDir = './dist';
	if (fs.existsSync(distDir)) {
		fs.removeSync(distDir);
	} 
	// 不要なビルドファイル削除
	const buildDir = './build';
	if (fs.existsSync(buildDir)) {
		fs.removeSync(buildDir);
	}
	// ビルドディレクトリ作成
	fs.mkdirSync(buildDir);
}

/*
 * ビルドディレクトリへのContents・htmlリソースコピー処理
 */
function copyParamaters() {
	// Contentsディレクトリ配下を一括コピー
	copyDirectory('./contents', './build/contents');
	// htmlリソースを一括コピー
	fs.readdirSync('./src', { withFileTypes: true }).forEach((content) => {
		// テンプレート（src直下のファイル）はビルドファイル作成でコピーするので対象外
		if (content.isDirectory() && content.name !== 'framework') {
			copyDirectory(path.join('./src', content.name), path.join('./build', content.name));
		} 
	});
}

/*
 * ディレクトリ配下の一括コピー処理
 */
function copyDirectory(src, dest) {

	// ディレクトリを生成
	fs.mkdirSync(dest, { recursive: true });
	// ディレクトリ内を再帰的に確認して最下層までディレクトリとファイルをコピーする
	fs.readdirSync(src, { withFileTypes: true }).forEach((content) => {
		const source = path.join(src, content.name);
		const destination = path.join(dest, content.name);
		if (content.isDirectory()) {
			copyDirectory(source, destination);
		} else {
			fs.copyFileSync(source, destination);
		}
	});
}

/*
 * コンテンツ一覧用のビルドファイル生成処理
 */
function makeContentsList(menuFolderPath) {

	// タイル生成用のフォーマット文字列
	console.log('makeContentsList:start:' + menuFolderPath);
	let tiles = ""
	let tileFormat = `
		<a href="{$href}" target="_blank" class="card">
			<img src="{$image}" alt="Card image" class="card-img">
			<div class="card-body">
				<h2 class="card-title">{$title}</h2>
				<p class="card-text">{$description}<br><br>{$type}</p>
			</div>
		</a>
	`;
	
	// ベースのindexテンプレートをbuildディレクトリにコピーする
	fs.copyFileSync('./src/index.11ty.js', './build/index.11ty.js');

	// コンテンツをフォルダ名でソート
	let contentsList = [];
	fs.readdirSync(menuFolderPath, { withFileTypes: true }).forEach((contents) => {
		if (contents.isDirectory()) {
			contentsList.push(contents);
		}
	});
	contentsList.sort((a, b) => a.name.localeCompare(b.name));

	// メニュー配下のコンテンツをビルドファイルに置き換える
	contentsList.forEach((contents) => {

		// config.jsを元にタイルhtmlをフォーマットしてタイル情報に追記
		const configPath = path.join(__dirname, menuFolderPath, contents.name, 'config.js');
		const config = require(configPath);
		const contentsFolderPath = path.join(menuFolderPath, contents.name)
		const buildContentPath = path.join('build', contentsFolderPath);

		// 外部URL表示用のlinkが設定されていればlinkそれ以外は説明画面を遷移先に指定する
		let href = "";
		if (config.externalLink) {
			href = config.externalLink;
		} else {
			href = path.join('..', contentsFolderPath, 'explain/index.html').replace(/\\/g, '/');
			// 説明画面のコンテンツを作成
			makeExplains(buildContentPath);
		}
		fs.unlinkSync(path.join(buildContentPath, 'config.js'));

		// タイルをフォーマットする
		const formattedString = tileFormat
			.replace('{$href}', href)
			.replace('{$image}', path.join(contentsFolderPath, config.image).replace(/\\/g, '/'))
			.replace('{$title}', config.title)
			.replace('{$description}', config.description)
			.replace('{$type}', config.type ? 'Type : ' + config.type : '');
			tiles += formattedString + '\n';
	});
  
	// タイル一覧画面のテンプレートファイルをビルドディレクトリにコピー
    const language = menuFolderPath.split('/').pop();
    const listName = language.toLowerCase().replace(/\s+/g, '') + 'List';
	if (!fs.existsSync('./build/tiles')) {
		fs.mkdirSync('./build/tiles', { recursive: true });
	}
	
	fs.copyFileSync(`./src/${listName}.11ty.js`, `./build/tiles/${listName}.11ty.js`);

	// ビルドディレクトリのテンプレートhtmlを追記したタイル情報でフォーマット
    const filePath = `./build/tiles/${listName}.11ty.js`;
	let fileContents = fs.readFileSync(filePath, 'utf-8');

	const menuConfigPath = path.join(__dirname, menuFolderPath, 'menuConfig.js');
	const menuConfig = require(menuConfigPath);
	fileContents = fileContents.replace('{$title}', menuConfig.contentsTitle);
	fileContents = fileContents.replace('{$tileList}', tiles);
	fs.writeFileSync(filePath, fileContents, 'utf-8');
	fs.unlinkSync(path.join('./build', menuFolderPath, 'menuConfig.js'));
}

/*
 * コンテンツ説明用のビルドファイル生成処理
 */
function makeExplains(contentsFolderPath) {

	// 閲覧コンテンツのフォーマット文字列
	console.log('makeExplains:start:' + contentsFolderPath);
	var link = "";
	var explainFormatMp4 = `<a href="../{$fileName}/index.html">{$fileName}.mp4</a>`;
	var explainFormatPDF = `<a href="../{$fileName}/index.html">{$fileName}.pdf</a>`;
	var explainFormatStoryline = `<a href="../{$fileName}/index.html">{$fileName}.html</a>`;
    
	// 説明画面のテンプレートをビルドディレクトリにコピーする
	const srcPath = path.join(__dirname, 'src', 'explain.11ty.js');
	const destPath = path.join(contentsFolderPath, 'explain.11ty.js');
	fs.copyFileSync(srcPath, destPath);

	// contentsフォルダに格納された説明文言で説明画面のテンプレートをフォーマットする
	const htmlPath = path.join(contentsFolderPath, 'explain.html');
	let htmlContents = fs.readFileSync(htmlPath, 'utf-8');
	let fileContents = fs.readFileSync(destPath, 'utf-8');
	htmlContents = htmlContents.replaceAll('<img src="', '<img src="../');
	fileContents = fileContents.replace('{$description}', htmlContents);
	fs.writeFileSync(destPath, fileContents, 'utf-8');
	
	// コンテンツフォルダの階層情報からリソースフォルダまでの相対パスを算出
	// ※リソースフォルダまでのスラッシュ数分、上位の階層に戻るように設定
	const relativePath = "../".repeat(contentsFolderPath.split(path.sep).length - 1);

	// コンテンツをフォルダ名でソート
	let contentsList = [];
	fs.readdirSync(contentsFolderPath, { withFileTypes: true }).forEach((contents) => {
		if (contents.isFile()) {
			let extension = contents.name.split('.').pop();
			if (extension === 'mp4' || extension === 'pdf') {
				contentsList.push(contents);
			}
		} else {
			contentsList.push(contents);
		}
	});
	contentsList.sort((a, b) => a.name.localeCompare(b.name));

	// フォルダ内を確認してコンテンツへの閲覧リンクを設定する
	contentsList.forEach((contents) => {

		// 確認対象がファイルならmp4、pdfのリンク設定と閲覧画面の生成を行う
		if (contents.isFile()) {
			let fileNameWithoutExtension = contents.name.split('.');
			fileNameWithoutExtension.pop(); 
			let fileName = fileNameWithoutExtension.join('.'); 
			let extension = contents.name.split('.').pop();
			switch(extension) {
				case 'mp4':
					link += explainFormatMp4.replace(/\{\$fileName\}/g, fileName) + '<br>';
					makeContents(contentsFolderPath, 'mp4', relativePath, fileName);
					break;
				case 'pdf':
					link += explainFormatPDF.replace(/\{\$fileName\}/g, fileName) + '<br>';
					makeContents(contentsFolderPath, 'pdf', relativePath, fileName);
					break;
				default:
					break;
			}
		} 
		// 確認対象がディレクトリならstorylineのリンク設定と閲覧画面の生成を行う
		else if (contents.isDirectory()) {
			link += explainFormatStoryline.replace(/\{\$fileName\}/g, contents.name) + '<br>';
			makeContents(contentsFolderPath, 'storyline', relativePath, contents.name);

		}
	});

	// テンプレートファイルをリンク文字列と説明文言でフォーマット
	if (link) {
		link = `<div class="contents">` + link + `</div>`;
	}
	fileContents = fileContents.replace('{$link}', link);
	fileContents = fileContents.replaceAll('{$relativePath}', relativePath);
	fs.writeFileSync(destPath, fileContents, 'utf-8');
	fs.unlinkSync(path.join(contentsFolderPath, 'explain.html'));
}

/*
 * コンテンツ閲覧用のビルドファイル生成処理
 */
function makeContents(contentsFolderPath, extension, relativePath, fileName) {

	// コンテンツ閲覧画面のテンプレートをビルドディレクトリにコピーする
	console.log('makeContents:start:' + contentsFolderPath + "/" + fileName);
	const templateName = extension + '.11ty.js'
	const templateSrc = path.join(__dirname, 'src', templateName);
	let templateDest = path.join(contentsFolderPath, templateName);
	fs.copyFileSync(templateSrc, templateDest);

	// コンテンツが複数あるので重複しないようコンテンツ名でテンプレート名を置き換える
	let newTemplateName = `${fileName}.11ty.js`;
	let newTemplatePath = path.join(contentsFolderPath, newTemplateName);
	fs.renameSync(templateDest, newTemplatePath);

	// 閲覧コンテンツのパスでテンプレートファイルをフォーマットする
	let templateContents = fs.readFileSync(newTemplatePath, 'utf-8');
	templateContents = templateContents.replaceAll('{$relativePath}', relativePath);
	templateContents = templateContents.replace('{$fileName}', fileName);
	fs.writeFileSync(newTemplatePath, templateContents, 'utf-8');

}

/*
 * 画面タイトル画像/文言設定処理
 */
function setDisplayHeader(directory) {

	// build配下のテンプレート（11ty.js）を検索する
	for (const file of fs.readdirSync(directory)) {
		
		// 下にディレクトリがある場合は再帰的に照合する
		const filePath = path.join(directory, file);
		if ((fs.statSync(filePath)).isDirectory()) {
			setDisplayHeader(filePath); 
		} 
		// テンプレートを見つけたらhtmlヘッダにタイトルを追記する
		else if (file.endsWith('.11ty.js')) {
		    const contents = fs.readFileSync(filePath, 'utf8');
		    const relativePath = file.endsWith('index.11ty.js') ? "" : "../".repeat(directory.split(path.sep).length);
		    let header = `<head>\n\t\t  <title>Bridgestone MDPF Portal</title>\n\t\t  <link rel="icon" type="image/x-icon" href="{$relativePath}assets/images/B Mark_.ico" sizes="16x16">`;
		    header = header.replace('{$relativePath}', relativePath);
		    const modifiedContents = contents.replace('<head>', header);
		    fs.writeFileSync(filePath, modifiedContents, 'utf8');
		}
	}
}

start();