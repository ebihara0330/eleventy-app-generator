/***********************************************************************
 * title
 * 	・英語向けタイル一覧テンプレート
 * 
 * description
 *  ・パラメータを設定してビルドするとenglishメニュー選択時のタイル一覧が生成される
 *  ・なお、各メニューのタイル構成は同じため共通のタイルテンプレートを流用する
 * 　 - パラメータ tileList：タイル一覧
 * 
 ***********************************************************************/

const template = require("../commons/templates/tileList.js");

class englishList {
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

module.exports = englishList;
