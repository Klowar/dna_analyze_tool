import { BrowserWindow } from 'electron';
import { createWindow } from './../view/welcome/index';

// const windows = new Map<string, BrowserWindow>();
let currWindow: BrowserWindow = null;

const displayStack = ["welcome"];

export const handleRouting = async (name?: string): Promise<void> => {
    if (name === undefined) {
        return currWindow.show();
    }

    const module = await import(`../view/${name}/index.js`);
    if (module === undefined) {
        return;
    }
    currWindow = module.default();
    displayStack.push(name);
}

export const firstInit = (): void => {
    currWindow = createWindow();
    handleRouting();
}