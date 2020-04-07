import { BrowserWindow } from 'electron';
import * as path from 'path';

export const loadPlotsWindow = (win: BrowserWindow): BrowserWindow => {
    // Create the browser window.

    win.loadFile(path.join(__dirname, 'plots.html'));
    // window.webContents.openDevTools();
    return win;
};

export default loadPlotsWindow;