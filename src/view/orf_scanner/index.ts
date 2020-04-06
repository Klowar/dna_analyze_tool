import { BrowserWindow } from 'electron';
import * as path from 'path';

export const loadScannerWindow = (win: BrowserWindow): BrowserWindow => {
    // Create the browser window.

    win.loadFile(path.join(__dirname, 'orf_scanner.html'));
    // window.webContents.openDevTools();
    return win;
};

export default loadScannerWindow;