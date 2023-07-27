/***********************************************************************
 * title
 * 	・Storyline閲覧用テンプレート
 * 
 * description
 *  ・パラメータを設定してビルドするとStoryline閲覧画面が生成される
 *  　- relativePath 本ファイルからリソースファイルまでの相対パス
 *  　- fileName 閲覧用コンテンツのファイル名
 * 
 ***********************************************************************/

module.exports = () => {

  return `
	
	<!DOCTYPE html>

  <html>
	
		<head>
			<meta charset="UTF-8">
			<link rel="stylesheet" type="text/css" href="{$relativePath}../assets/css/global.css" />
			<link rel="stylesheet" type="text/css" href="{$relativePath}../assets/css/story.css" />
			<script src="{$relativePath}../js/global.js"></script>
		</head>
	
		<body>
			<div class="body-container">
				<div class="actionBar">
					<img src="{$relativePath}../assets/images/BsLogo.png" class="bsImage">
					<div class="actionBarContents">
						<button id="logoutButton" class="logoutButton">Logout</button>
					</div>
				</div>
	
				<div class="Storyline-container">
				  <iframe src="story.html"></iframe>
			  </div>
			</div>
		</body>
	
	</html>

	`;
}

