const electron = require('electron');
const app = electron.app;
const browserWindow = electron.BrowserWindow;
var mainWindow = null;
app.on('ready', function () {
    mainWindow = new browserWindow({ width: 1040, height: 800 });
  //  mainWindow.webContents.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    })
});
