/*========================================================================================

		.8.   8888888 88888888 8 8888888o.    8 88  8 88     88       ,8.     ,8.
       :888.        8 88       8 88    `88.   8 88  8 88     88      .`88.   .`88.
      . `888.       8 88       8 88     ,88   8 88  8 88     88     ,8.`88. ,8.`88.
     .8. `888.      8 88       8 88.   ,88'   8 88  8 88     88    ,8'8.`88,8^8.`88.
    .8`8. `888.     8 88       8 8888888P'    8 88  8 88     88   ,8' `8.`88' `8.`88.
   .8' `8. `888.    8 88       8 88`88b       8 88  8 88     88  ,8'   `8.`'   `8.`88.
  .8'   `8. `888.   8 88       8 88 `88b.     8 88  8 88    ,8P ,8'     `8.     `8.`88.
 .888888888. `888.  8 88       8 88   `88b.   8 88   '88   ,d8',8'       `8      `8.`88.
.8'       `8. `888. 8 88       8 88    '888.  8 88    'Y888P' ,8'         `       `8.`88.

========================================================================================*/

const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
	Menu.setApplicationMenu(null);

	const mainWindow = new BrowserWindow({
		title: 'Atrium',
		width: 1000,
		height: 750,
		//webPreferences: {webSecurity: false, }
	});

	mainWindow.setIcon('./assets/Atrium_2_64.png');

	//mainWindow.webContents.openDevTools();

	const startUrl = url.format({
		pathname: path.join(__dirname, './app/build/index.html'),
		protocol: 'file',
	});

	mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);
