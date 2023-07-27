/* ******************************************************************
 * 	title:
 *		・一覧画面用のスクリプト定義ファイル
 *		
 *	overView:
 *		・一覧画面のスクリプトを記載する
 * 
 * ******************************************************************/

/*
 * 画面の表示制御
 *
 * htmlを参照するためhtml読み込み後（CSS、画像読み込み前）に実行する
 * また、サーバアクセスがあるので非同期で実行する
 */
document.addEventListener('DOMContentLoaded', async function () {

	// 最上段に表示するメニューのコンテンツをロード
	loadHomeContents();

	// メニューの表示切り替え
	await menuDisplayControl();
	
	// メニュー選択時のリスナー設定
	addMenuSelectListener();

	// メニュー開閉時の高さ調整リスナー設定
	addLiHoverListener();

});

/*
 * ユーザの権限に応じたメニューの表示制御
 * ユーザ権限に応じてメニューの表示内容を切り替える
 */
async function menuDisplayControl() {

	try {

		// ユーザが所属するメニューグループを取得
		const authorizationResult = await fetch("/api/getAuthorizations");
		const authorizations = await authorizationResult.json();

		let splitArr = authorizations.map(authorization => 
			authorization.split('-')
			  .map(subItem => subItem.trim().toLowerCase()) 
			  .filter(subItem => subItem !== 'extportalauthmenu')
		  );
		let flattenedArr = [].concat.apply([], splitArr);
		let menuNames = [...new Set(flattenedArr)];

		// 表示権限のあるメニューを非表示⇒表示に切り替える
		menuNames.forEach(function (menuName) {
		  var element = document.getElementById(menuName + '-menu');
		  if (element) {
			element.parentElement.style.display = 'block';
			element.style.display = 'block';
		  }
		});
	} catch (error) {
		console.error('Error:', error);
	}
}

/*
 * メニュー開閉時の高さ調整
 */
function addLiHoverListener() {

	let liElements = document.querySelectorAll('.li'); 

	liElements.forEach((liElement) => {
	  let subMenus = liElement.querySelectorAll('.sub');
	  liElement.addEventListener('mouseover', function () {
		subMenus.forEach((subMenu) => {
		  subMenu.classList.remove('closed');
		});
	  });
  	  liElement.addEventListener('mouseout', function () {
		subMenus.forEach((subMenu) => {
		  subMenu.classList.add('closed');
		});
	  });
	});
  }

/*
 * トップページのコンテンツ生成処理
 * 表示されたメニューの最上段のコンテンツをロードする
 */
function loadHomeContents() {
	// メニュー内の要素を照合
	Array.prototype.some.call(document.querySelectorAll('[id$="-menu"]'), function(element) {
		// 表示状況を確認
		let style = window.getComputedStyle(element);
		// 表示対象を検索して最初にヒットしたメニューのコンテンツをロードする
		if (style.display === "block") {
			let elements = [element].concat(Array.from(element.querySelectorAll('*')));
			return elements.some(function(childElement) {
				if(childElement.hasAttribute('data-url')) {
					(document.getElementById('contents')).style.display = 'block';
					loadContents(childElement.getAttribute('data-url'));
					return true;
				}
				return false;
			});
		}
		return false;
	});
}

/*
 * メニュー選択時のリスナー設定
 * メニュー選択イベントにコンテンツのロード処理を設定する
 */
function addMenuSelectListener() {			

	let items = document.querySelectorAll('.li');
	items.forEach((item) => {
		item.addEventListener('click', function () {
			let url = this.getAttribute('data-url');
			if(url !== null) {
				loadContents(url);
			}
		});
	});
}

/*
 * メニュー選択時のコンテンツロード処理 
 * 選択されたメニューのhtml(home/english/spanish/portguese..)をロードする
 */
function loadContents(url) {
	fetch(url)
	.then(response => response.text())
	.then(data => {
		document.getElementById('contents').innerHTML = data;
		let cards = document.querySelectorAll('.card');
		cards.forEach((card) => {
			card.addEventListener('mouseover', function () {
				this.classList.add('focused');
			});
			card.addEventListener('mouseout', function () {
				this.classList.remove('focused');
			});
		});
	})
}
