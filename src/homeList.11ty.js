/***********************************************************************
 * title
 * 	・Home向けタイル一覧テンプレート
 * 
 * description
 *  ・パラメータを設定してビルドするとHomeメニュー選択時のタイル一覧が生成される
 *  ・なお、各メニューのタイル構成は同じため共通のタイルテンプレートを流用する
 * 　 - パラメータ tileList：タイル一覧
 * 
 ***********************************************************************/

const template = require("../commons/templates/tileList.js");

class homeList {
  data() {
    return {
      title : `{$title}`,
      tileList: `{$tileList}`
    };
  }

  render(data) {
    return template(data);
  }
}

module.exports = homeList;
