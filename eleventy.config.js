/***********************************************************************
 * title
 * 	・11tyのビルド設定ファイル
 * 
 * description
 *  ・以下の設定を行う
 *    - テンプレートの作成に使用する言語
 *    - ビルド対象ファイル
 *    - 入出力ディレクトリ
 * 
 ***********************************************************************/

module.exports = (eleventyConfig) => {

  // テンプレート言語：javaScript
  eleventyConfig.setTemplateFormats(["11ty.js"]);

  // ビルド対象：コンテンツ・リソース・スクリプトは全て対象
  eleventyConfig.addPassthroughCopy({"build/assets/**/*": true, "build/js/**/*": true, "build/contents/**/*": true});

  // ビルド対象：gitの管理対象外設定（git経由するため）
  eleventyConfig.addPassthroughCopy(".gitignore");

  // 入出力ディレクトリ：srcだとソースに影響が出るので別ディレクトリを作成して作業
  return {
    dir: {
      input: "build",
      output: "dist/site"
    }
  };
};