/***********************************************************************
 * title
 * 	・タイル一覧の共通テンプレート
 * 
 * description
 *  ・コンテンツ一覧に表示するタイルの汎用テンプレート
 *  ・タイルリストを引数に設定してビルドするとメニュー選択時に表示するタイルが生成される
 * 
 ***********************************************************************/

function template(data) {

	return `
	
		<div class="contentsTitle"><div class="contentsTitleHypen">|&nbsp;</div>${data.title}</div>
		<div class="innerContentsList">
			${data.tileList}
		</div>
  
	`;
}
module.exports = template;