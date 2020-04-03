import { BrowserWindow } from 'electron';
import * as path from 'path';

export const loadWelcomeWindow = (win: BrowserWindow): BrowserWindow => {
    // Create the browser window.

    win.loadFile(path.join(__dirname, 'welcome.html'));

    return win;
};

export default loadWelcomeWindow;