import { BrowserWindow } from 'electron';
import { createWindow } from './../view/welcome';

const windows = new Map<string, BrowserWindow>();

const displayStack = ["welcome"];

export const handleRouting = async (name?: string): Promise<void> => {
    if (name === undefined) {
        return windows.get(displayStack[displayStack.length - 1]).show();
    }


    let toDisplay = windows.get(name);
    if (toDisplay === undefined) {
        const module = await import(`../view/${name}/index.js`);
        if (module === undefined) {
            return;
        }

        // Create new window and cache it
        toDisplay = module.default();
        windows.set(
            name,
            toDisplay
        );

    }
    windows.get(displayStack[displayStack.length - 1]).hide();
    toDisplay.show();
    displayStack.push(name);

}

export const firstInit = (): void => {
    windows.set("welcome", createWindow());
    handleRouting();
}