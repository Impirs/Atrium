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

	if (process.env.NODE_ENV === 'development') {
		require('electron-reload')(__dirname, {
			electron: require(`${__dirname}/node_modules/electron`),
		});

		const { globalShortcut } = require('electron');

		globalShortcut.register('Ctrl+Shift+R', () => {
			mainWindow.webContents.reloadIgnoringCache();
		});
	}
}

app.whenReady().then(createMainWindow);
