import { app, BrowserWindow, ipcMain } from 'electron';
import { clearHandlers, loadHandlers } from './utils/handlers_util';
import { createWindow, firstInit, handleRouting } from './utils/window_util';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//ipcMain.on will receive info from renderprocess 
ipcMain.on("route", (event, args) => {
  handleRouting(args);
  clearHandlers(ipcMain);
  loadHandlers(ipcMain, args);
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
