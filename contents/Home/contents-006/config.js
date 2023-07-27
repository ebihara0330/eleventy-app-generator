/*********************************************************
 * title
 *   コンテンツ（一覧）のプロパティファイル
 *
 * description
 *   コンテンツ一覧に表示するタイルの内容を設定する
 *
 *********************************************************/ 

module.exports = {

    // タイルに表示する画像ファイル名
    image: 'test1.png',

    // タイルの画像下に表示するタイトル
    title: 'Test News',

    // タイトル下に表示するコンテンツの説明文言
    description: 'The highly anticipated world championship fight will take place at 10am.',

    // 閲覧用コンテンツのファイル拡張子
    // 未設定もしくはMP4、PDF、Storylineの内1つ以上
    // 設定された文字列をそのまま設定するため区切り文字は任意（MP4、PDFなど）
    type: ''
};
