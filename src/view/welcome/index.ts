import { BrowserWindow } from 'electron';
import * as path from 'path';

export const createWindow = (): BrowserWindow => {
    // Create the browser window.
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    console.log(__dirname);

    window.loadFile(path.join(__dirname, './welcome.html'));

    return window;
};

export default createWindow;