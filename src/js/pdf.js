/* ******************************************************************
 * 	title:
 *		・pdf閲覧画面用のスクリプト定義ファイル
 *		
 *	overView:
 *		・pdf閲覧画面のスクリプトを記載する
 * 
 * ******************************************************************/

/*
 * PDF.jsによるPDFロード処理 
 * edge標準のビューワだとコンテンツのダウンロード制御ができないため独自ビューワを使用する
 */
function loadPDF(pdfPath) {
	const loadingTask = pdfjsLib.getDocument(pdfPath);

	pdfjsLib.GlobalWorkerOptions.workerSrc = "./build/pdf.worker.js";
	pdfjsLib.verbosity = pdfjsLib.VerbosityLevel.ERRORS;
	loadingTask.promise.then((pdf) => {
	
		const numPages = pdf.numPages;
		let promiseChain = Promise.resolve();

		for (let pageNum = 1; pageNum <= numPages; pageNum++) {
			promiseChain = promiseChain.then(() => {
				return pdf.getPage(pageNum).then((page) => {
					const canvas = document.createElement("canvas");
					const context = canvas.getContext("2d");
					const renderViewport = page.getViewport({ scale: 1.4 });
					canvas.width = Math.floor(renderViewport.width);
					canvas.height = Math.floor(renderViewport.height);

	                canvas.style.width = "80%"; 
	                canvas.style.height = "auto";

					const renderContext = {
						canvasContext: context,
						viewport: renderViewport,
					};
					return page.render(renderContext).promise.then(() => {
						document.getElementById("pdfContainer").appendChild(canvas);
					});
				});
			});
		}
		return promiseChain;
	});
}