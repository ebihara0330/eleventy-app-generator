/***********************************************************************
 * title
 * 	・PDF閲覧用テンプレート
 * 
 * description
 *  ・パラメータを設定してビルドするとPDF閲覧画面が生成される
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
			<link rel="stylesheet" type="text/css" href="{$relativePath}../assets/css/pdf.css" />
			<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js"></script>
			<script src="{$relativePath}../js/global.js"></script>
			<script src="{$relativePath}../js/pdf.js"></script>
			<script>
				loadPDF("../{$fileName}.pdf");
				disableRightClick(".pdf-container");
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
				<div class="pdf-container" id="pdfContainer"></div>
			</div>
		</body>
	
	</html>
  
	`;
}

