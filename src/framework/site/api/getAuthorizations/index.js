/*******************************************************************************************  
 * Overview
 *   ユーザの認可取得用API
 * 
 * Description
 *   ユーザのIDからAzure ADが提供するAPIで閲覧できるメニュー（=所属グループ）を取得する
 *   なお、APIの実行にAD B2CのクライアントID/Secretが必要なため、
 *   セキュリティリスク（※）を考慮してサーバサイドに実装する
 *   また、static web appsの埋め込みfunctionはstaticwebapp.config.jsonでアクセス制御
 *   （認証済ユーザ以外アクセス不可）を行うためfunction側で特別なチェックは行わない
 *   ※クライアントID/Secretをフロントに保存しておくと
 *     B2Cが利用できるAPI等の機能が第三者に利用される可能性あり
 * 
 ******************************************************************************************* /

/* 
 * メイン処理
 *
 * @param 画面の入力パラメータ
 * @returns ステータス、処理結果
 */
module.exports = async function (context, req) {

    try {
        const header = req.headers['x-ms-client-principal'];
        const encoded = Buffer.from(header, 'base64');
        const decoded = encoded.toString('ascii');
        const clientPrincipal = JSON.parse(decoded);

        setResponse(context, 200, await get(clientPrincipal.userId, context));

    } catch (error) {
        setResponse(context, 500, error);
        context.log.error('Error in getAuthorizations:', error);
    }
}

/* 
 * 返却値設定
 *
 * @param 返却値設定用のコンテキスト、ステータス、データ
 */
function setResponse(context, status, data) {
    context.res = {
        status: status,
        body: data
    };
}

/* 
 * ユーザの認可情報取得
 *
 * @param userId 入力のユーザID
 * @returns グループ名一覧
 */
async function get(userId) {

    // role取得用のライブラリ取得
    const {
        Client
    } = require('@microsoft/microsoft-graph-client');
    
    const {
        TokenCredentialAuthenticationProvider
    } = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

    const {
        ClientSecretCredential
    } = require('@azure/identity');

    // static web appsの埋め込みfunction上のnode.jsがfetch非対応のため追加読み込み
    const fetchModule = await import('node-fetch');
    const fetch = fetchModule.default || fetchModule;
    global.fetch = fetch;

    // センシティブな情報はリスク軽減のためAzure Static Web Appsの環境変数（process.env）に外だし
    const credential = new ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
        scopes: ['https://graph.microsoft.com/.default']
    });
    const graphClient = Client.initWithMiddleware({ authProvider: authProvider });

    // role取得
    const groups = await graphClient.api(`/users/${userId}/memberOf`).get();
    // 返却値からroleのみを抜粋してreturn
    return groups.value
        .filter(item => item['@odata.type'] === '#microsoft.graph.group')
        .map(item => item.displayName);
}
