const electron = require('electron');
const app = electron.app;
const browserWindow = electron.BrowserWindow;
var mainWindow = null;
app.on('ready' , function(){
mainWindow = new browserWindow({width:1020 , height: 750});
mainWindow.webContents.openDevTools();
mainWindow.loadURL('file://'+__dirname+'/app/index.html');

});
