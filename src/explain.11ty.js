/***********************************************************************
 * title
 * 	・コンテンツ説明用テンプレート
 * 
 * description
 *  ・パラメータを設定してビルドするとコンテンツ説明画面が生成される
 *  　- relativePath 本ファイルからリソースファイルまでの相対パス
 *  　- description コンテンツの説明文言
 *  　- link コンテンツの閲覧リンク
 * 
 ***********************************************************************/

module.exports = () => {

  return `
	
  <!DOCTYPE html>

	<html>  
		<head>
			<meta charset="UTF-8">
			<link rel="stylesheet" type="text/css" href="{$relativePath}../assets/css/global.css" />
			<link rel="stylesheet" type="text/css" href="{$relativePath}../assets/css/explain.css" />
			<script src="{$relativePath}../js/global.js"></script>
		</head>

		<body>

			<div class="actionBar">
				<img src="{$relativePath}../assets/images/BsLogo.png" class="bsImage">
				<div class="actionBarContents">
					<button id="logoutButton" class="logoutButton">Logout</button>
				</div>	
			</div>

			<div class="body-container">

				<div class="explain">
					<div class="wording">
						{$description}
					</div>
					{$link}
				</div>

				<div class="footer">
						<div class="footer-text">&copy; Bridgestone Corporation</div>
				</div>
			</div>
		</body>
	</html>
  
	`;
}
