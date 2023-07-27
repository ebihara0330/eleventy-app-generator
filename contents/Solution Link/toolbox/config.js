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
    image: 'Toolbox_logo_whiteBG.png',

    // タイルの画像下に表示するタイトル
    title: 'Toolbox application link',

    // タイトル下に表示するコンテンツの説明文言
    description: 'If you use Toolbox, please select this tile.',

    // 閲覧用コンテンツのファイル拡張子
    // 未設定もしくはMP4、PDF、Storylineの内1つ以上
    // 設定された文字列をそのまま設定するため区切り文字は任意（MP4、PDFなど）
    type: '',
    
    // タイルから外部サイトを参照する場合の遷移先URL
    externalLink: 'https://bridgestonemobility.b2clogin.com/bridgestonemobility.onmicrosoft.com/b2c_1a_username_susi/oauth2/v2.0/authorize?client_id=0f6720a8-8777-4d35-b081-7f7ea3b3ee94&redirect_uri=https%3A%2F%2Fwww.bstoolbox.com%2Fsignin-oidc&response_type=id_token&scope=openid%20profile&response_mode=form_post&nonce=638142915857983201.MGZjMjc0NWYtYzMzMC00MjdiLWJiMjktYzU2YjdhYTI5NDgzMmYyZmNmMmUtNDA1NS00MTA5LTliNWItYzAxNDlkNGUxZDhi&client_info=1&x-client-brkrver=IDWeb.1.23.1.0&ui_locales=ja&state=CfDJ8HSO3McfKW5DmxS90P1ybL-sSIykoRKZCM92KD4btKuAgfsHb7f_u-JyFJi-LdqxjBhH_RR0LlA8NyMdMhFaPFWQlXUVtvevySPETiEmzHJVA6NhLa-9ox0jsdB4Qr1AR7q8OyQIdn5WMipiIiGHtx3OEfxDmzKnPWBRYMY-Yi1ntl29pePyUChCl6MF0NR4kfrYaoXiIAvMUdFUX0mopBKgxwmhb_QB18w-YgbN-2JU8tnjLfUGq-hypjQkoTigIgWFHXWTT5ggwKmZILPJlWXEg4zqj-KiMZUfXbv612ol&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.16.0.0?',
};
