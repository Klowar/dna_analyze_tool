import { app, BrowserWindow, ipcMain } from 'electron';
import { firstInit, handleRouting } from './utils/window_util';
import { createWindow } from './view/welcome';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//ipcMain.on will receive info from renderprocess 
ipcMain.on("route", function (event, args) {
  handleRouting(args);
});

app.on('ready', firstInit);

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
