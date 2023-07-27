/***********************************************************************
 * title
 * 	・ビルド結果の調整用スクリプト
 * 
 * description
 *  ・不要な11tyの設定ファイルを削除する
 *  ・contentsフォルダ配下には様々な形式のファイルを格納するため
 * 　 配下のディレクトリ・フォルダ一式をビルド対象としているが、
 *    同設定を適用した場合、11tyの仕様上一部ファイルの対象外設定ができないため
 * 　 ビルド完了後に、contentsフォルダ配下の不要な11tyファイルを削除する
 * 　 ※11tyファイルはビルド時に参照するがビルド後は使用しない
 * 
 ***********************************************************************/

const fs = require('fs');
const path = require('path');

/*
 * メイン処理
 */
function start() {

    // ビルド結果のcontents配下に含まれる11ty.jsを一括削除
    delete11tyFiles(path.join(__dirname, 'dist', 'site', 'contents'));
}

/*
 * 11tyファイルの一括削除処理
 */
function delete11tyFiles(directoryPath) {
    
    fs.readdirSync(directoryPath, { withFileTypes: true }).forEach((content) => {
        const fullPath = path.join(directoryPath, content.name);

        // ディレクトリを見つけた場合はその配下を照合する
        if (content.isDirectory()) {
            delete11tyFiles(fullPath);
        // ファイルの場合は拡張子が11ty.jsなら削除する
        } else if (content.name.endsWith('.11ty.js')) {
            fs.unlinkSync(fullPath);
        }
    });
}
start();
