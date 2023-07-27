/***********************************************************************
 * title
 * 	・MP4閲覧用テンプレート
 * 
 * description
 *  ・パラメータを設定してビルドするとMP4閲覧画面が生成される
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
			<link rel="stylesheet" type="text/css" href="{$relativePath}../assets/css/mp4.css" />
			<script src="{$relativePath}../js/global.js"></script>
			<script>
				disableRightClick(".video-container");
			</script>
		</head>
	
		<body>
			<div class="body-container">
				<div class="actionBar">
					<img src="{$relativePath}../assets/images/BsLogo.png" class="bsImage">
					<div class="actionBarContents">
						<button id="logoutButton" class="logoutButton">Logout</button>
					</div>
				</div>
	
				<div class="video-container">
					<video controls controlsList="nodownload">
						<source src="../{$fileName}.mp4" type="video/mp4">
					</video>
				</div>
			</div>
		</body>
	</html>
  
	`;
}

