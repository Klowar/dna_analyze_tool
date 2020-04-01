import { BrowserWindow } from 'electron';
import * as path from 'path';

export const createWindow = (): BrowserWindow => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    console.log(__dirname);

    mainWindow.loadFile(path.join(__dirname, './scanner.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    return mainWindow;
};

export default createWindow;