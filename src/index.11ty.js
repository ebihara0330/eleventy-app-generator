/***********************************************************************
 * title
 * 	・コンテンツ一覧用テンプレート
 * 
 * description
 *  ・ビルドするとコンテンツ一覧画面が生成される
 *  　※パラメータなし
 * 
 ***********************************************************************/

module.exports = () => {

  return `

  <!DOCTYPE html>

  <html>
  
	  <head>
		  <meta charset="UTF-8">
		  <link rel="stylesheet" type="text/css" href="./assets/css/global.css" />
		  <link rel="stylesheet" type="text/css" href="./assets/css/index.css" />
		  <script src="./js/global.js"></script>
		  <script src="./js/index.js"></script>

	  </head>
  
	  <body>
		  <!-- アクションバー -->
		  <div class="actionBar">
			  <img src="assets/images/BsLogo.png" class="bsImage">
			  <div class="actionBarContents">
				  <button id="logoutButton" class="logoutButton">Logout</button>
			  </div>	
		  </div>
  
		  <!-- 一覧画面要素の表示領域 -->
		  <div class="baseContainer">
			  <div class="menuContainer">
  
				  <!-- メニュー -->
				  <div class="acordion" id="menu">
					  <ul class="ul" style="display: block;">
						  <li class="li" id="home-menu" style="display: block;" data-url="tiles/homeList/index.html">Home</li>
					  </ul>
					  <ul class="ul" style="display: none;">
						  <li class="li" id="toolboxmanuals-menu" style="display: none;">Toolbox Manuals
							  <ul class="ul sub closed">
								<li class="li" data-url="tiles/englishList/index.html">English</li>
							  </ul>
							  <ul class="ul sub closed">
								  <li class="li" data-url="tiles/spanishList/index.html">Spanish</li>
							  </ul>
							  <ul class="ul sub closed">
								  <li class="li" data-url="tiles/portugueseList/index.html">Portuguese</li>
							  </ul>
						  </li>
					  </ul>
					  <ul class="ul" style="display: none;">
						<li class="li" id="solutionlink-menu" style="display: none;" data-url="tiles/solutionlinkList/index.html">Solution Link</li>
					</ul>
				</div>
  
				  <!-- メニュー下のfooter text -->
				  <div class="footer">
					  <div class="footer-text">&copy; Bridgestone Corporation</div>
				  </div>
			  </div>
  
			  <div class="contentsContainer">
  
				  <!-- Topバナー -->
				  <div class="topBanner">
					  <img src="assets/images/main.png" class="mainImage">
					  <img src="assets/images/Logo.png" class="logoImage" >
				  </div>
  
				  <!-- コンテンツ一覧（選択されたメニューに応じてhome/english/spanish/portugueseListhtmlからそれぞれ読み込み） -->
				  <div id="contents" class="contentsList" style="display: none;"></div>
			  </div>
		  </div>
  
	  </body>
  </html>

    `;
}
