/***********************************************************************
 * title
 * 	・スペイン語向けタイル一覧テンプレート
 * 
 * description
 *  ・パラメータを設定してビルドするとspanishメニュー選択時のタイル一覧が生成される
 *  ・なお、各メニューのタイル構成は同じため共通のタイルテンプレートを流用する
 * 　 - パラメータ tileList：タイル一覧
 * 
 ***********************************************************************/

const template = require("../commons/templates/tileList.js");

class spanishList {
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

module.exports = spanishList;
