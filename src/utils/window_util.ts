import { BrowserWindow } from 'electron';
import { createWindow } from './../view/welcome/index';

// const windows = new Map<string, BrowserWindow>();
let currWindow: BrowserWindow = null;

const displayStack: number[] = [];

export const handleRouting = async (name?: string): Promise<void> => {
    if (name === undefined) {
        return currWindow.show();
    }

    const module = await import(`../view/${name}/index.js`);
    if (module === undefined) {
        return;
    }
    const temp: BrowserWindow = module.default();
    currWindow.hide();
    currWindow = temp;
    temp.show();
    displayStack.push(currWindow.id);
}

export const firstInit = (): void => {
    currWindow = createWindow();
    displayStack.push(currWindow.id);
    handleRouting();
}

export const openPrevWindow = (): void => {
    displayStack.length -= 1;
    const windows = BrowserWindow.getAllWindows();
    const win = windows.find(_ => _.id === displayStack[displayStack.length - 1]);
    if (win) win.show();
}

export const closeAllWindows = (): void => {
    BrowserWindow.getAllWindows().forEach(_ => { if (_.id !== currWindow.id) _.destroy() });
}
