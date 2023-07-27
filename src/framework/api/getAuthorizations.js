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
 *******************************************************************************************/

const express = require('express');
const router = express.Router();
const {
    Client
} = require('@microsoft/microsoft-graph-client');
const {
    TokenCredentialAuthenticationProvider
} = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');
const {
    ClientSecretCredential
} = require('@azure/identity');
const fetch = require('node-fetch');
if (!global.fetch) {
    global.fetch = fetch;
}

/* 
 * メイン処理
 *
 * @param 画面の入力パラメータ
 * @returns ステータス、処理結果
 */
router.get('/getAuthorizations', async function(req, res){

    try {

        const header = req.headers['x-ms-client-principal'];
        const encoded = Buffer.from(header, 'base64');
        const decoded = encoded.toString('ascii');
        const clientPrincipal = JSON.parse(decoded);
        for(let claim of clientPrincipal.claims) {
            if(claim.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
                res.status(200).json(await get(claim.val));
                return;
            }
        }
        res.status(400).json({ message: "Error: claim 'nameidentifier' not found." });
    } catch (error) {
        res.status(500).json({ message: "Error in getAuthorizations", error: error.message });
    }
});

/* 
 * ユーザの認可情報取得
 *
 * @param userId 入力のユーザID
 * @returns グループ名一覧
 */
async function get(userId) {

    // センシティブな情報はリスク軽減のため（process.env）に外だし
    console.log('userId:', userId);
    const credential = new ClientSecretCredential("eb7cad0d-e878-40fe-80a3-95a554b62d18", "55cbc7a4-7f51-4dc4-8b27-e0e7ef468e94", "R3s8Q~VGzvnrtCRTkwO_8-4ZozFoo6lWdOtl_bBr");
    // const credential = new ClientSecretCredential(process.env.TENANT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    console.log('credential:', credential);
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
        scopes: ['https://graph.microsoft.com/.default']
    });
    console.log('authProvider:', authProvider);
    const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
    console.log('graphClient:', graphClient);

    // role取得
    const groups = await graphClient.api(`/users/${userId}/memberOf`).get();
    console.log('groups:', groups);

    // 返却値からroleのみを抜粋してreturn
    return groups.value
        .filter(item => item['@odata.type'] === '#microsoft.graph.group')
        .map(item => item.displayName);
}
module.exports = router;
