import { BrowserWindow } from 'electron';
import loadWelcomeWindow from './../view/welcome/index';

// const windows = new Map<string, BrowserWindow>();
let currWindow: BrowserWindow = null;

const displayStack: string[] = [];

export const handleRouting = async (name?: string): Promise<void> => {
    if (name === undefined) {
        return currWindow.show();
    }

    const module = await import(`../view/${name}/index.js`);
    if (module === undefined) {
        return;
    }
    const temp: BrowserWindow = module.default(currWindow);
    currWindow = temp;
    displayStack.push(name);
}

export const createWindow = (): BrowserWindow => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: true,
        }
    })
    return win;
}

export const closeAllWindows = (): void => {
    BrowserWindow.getAllWindows().forEach(_ => { if (_.id !== currWindow.id) _.destroy() });
}

export const openPrevWindow = (): void => {
    if (displayStack.length > 1) {
        displayStack.length -= 1;
        handleRouting(displayStack[displayStack.length - 1]);
    }
}


export const firstInit = (): void => {
    currWindow = createWindow();
    currWindow = loadWelcomeWindow(currWindow);
    currWindow.on('close', () => closeAllWindows());
    displayStack.push("welcome");
    handleRouting();
}