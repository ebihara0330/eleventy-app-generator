## ■system Name
* MDPF社外向けポータルサイト

　　 ※MDPF：Mining Digital Platform

## ■overview
* 社内向けのポータルサイトを社外にも広く情報発信するために構築する鉱山OR向けの社外ポータルサイト

　　※OR: Off the Road(建設・鉱山車両用タイヤ)

* 本システムでは、Azureクラウドと組み合わせて以下の機能を提供する
  * ポータルサイトに掲載するコンテンツの自動生成（CI/CD）機能
  * ポータルサイトのログイン・コンテンツ表示機能
  * ポータルサイトの利用状況管理機能

補足）
初回リリースで掲載するコンテンツはToolBoxのマニュアルのみを想定するが、
それを皮切りに、他のシステムのマニュアル、製品カタログ、ニュースなどを積極的に発信する想定

## ■how to use

### Environment
* デプロイメントトークンをStatic Web Apps ＞ 概要 ＞ デプロイメントトークンからコピーしてRepositoryのデプロイ先（開発/本番）を設定する
https://dev.azure.com/MDPF/Portal_External/_apps/hub/ms.vss-build-web.ci-designer-hub?pipelineId=19&branch=main

* Static Web Appsの構成メニューに登録した環境変数を接続するB2Cの情報に置き換える
<br>開発：https://portal.azure.com/#@bsjcloud.onmicrosoft.com/resource/subscriptions/b9d82223-f680-49af-a3a0-b4f05cad583f/resourceGroups/PROR-RG01/providers/Microsoft.Web/staticSites/miningdigital-pub-dev/staticsite
<br>本番：https://portal.azure.com/#@bsjcloud.onmicrosoft.com/resource/subscriptions/b9d82223-f680-49af-a3a0-b4f05cad583f/resourceGroups/PROR-RG01/providers/Microsoft.Web/staticSites/miningdigital-pub/staticsite

<br>CLIENT_ID：B2CアプリケーションのID（概要から確認可）
<br>CLIENT_SECRET：B2Cアプリケーションのクライアント値（IDではない 作成時のみ確認可能なため要保管）
<br>TENANT_ID：B2CテナントのテナントID（Azure AD＞テナントの管理＞テナント選択で確認可）
<br>
* staticwebapp.config.jsonの「wellKnownOpenIdConfiguration」を利用するユーザフローのURLで置き換える
※Azureポータル＞ B2C＞ユーザフロー＞ユーザフロー実行で表示されるダイアログの上部に記載されたURL


### Development
* Azure RepositoryのソースをDL・Cloneする 

※エディタは任意 推奨はVisual Studio Code

  ```
  git clone https://MDPF@dev.azure.com/MDPF/Portal_External/_git/Portal_External
  ```

* ソース修正後差分を確認して、ローカルで動作を確認する

 ```
 git diff > "C:/temp/diff.txt"
 ```

※Pythonがインストールされていることが前提

  ```

  // rootディレクトリ（Portal_External）で以下のコマンドを実行
  npm start

  // ブラウザを開いて動作を確認する
  http://localhost:3000

  ```

* Azure Repositoryに変更を反映（push）する

補足）
本サイトのRepository環境は開発用と本番用をそれぞれ作成している
実際の運用では、開発用のRepositoryにPush後、開発環境を自動生成⇒動作確認⇒承認⇒本番Repositoryに自動反映の流れになる
ブランチを複数定義する必要がない（mainにpushしても本番に反映されるわけではない）ため
各Repositoryはmainブランチのみの構成としている

  ```
  
  git add .
  git commit -m "commit message"
  git push
 
  ```

* 変更反映後、開発用のポータルサイトが自動生成されるので完了後URLにアクセスして動作を確認する


 ```

 // Pipeline（CI/CD）の実行結果確認用（正常終了していればOK）
 https://dev.azure.com/MDPF/Portal_External/_build

 // 開発用ポータルサイトのURL
 https://agreeable-field-021b50f00.3.azurestaticapps.net

 // 本番用ポータルサイトのURL
 https://gray-tree-05c429400.3.azurestaticapps.net/
 
 ```

