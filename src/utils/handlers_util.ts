import { IpcMain } from "electron";
import { HandlerType, ListenerType } from './../handlers/types';

// Used types
type Handlers = { [key: string]: HandlerType<any> }; // eslint-disable-line
type Listeners = { [key: string]: ListenerType };

// Cache current listeners and handlers to delete further
let currHandlers: Handlers = null;
let currListeners: Listeners = null;

// Handler set func
export const loadHandlers = async (handler: IpcMain, name?: string): Promise<void> => {
    const module = await import(`../handlers/${name}/index.js`);
    if (module === undefined) {
        return;
    }
    currHandlers = module.handlers;
    currListeners = module.listeners;

    for (const h in currHandlers) {
        handler.handle(h, currHandlers[h]);
    }
    for (const l in currListeners) {
        handler.on(l, currListeners[l]);
    }
}
// Handler remove func
export const clearHandlers = (handler: IpcMain): void => {
    for (const h in currHandlers) {
        handler.removeHandler(h);
    }
    for (const l in currListeners) {
        handler.removeListener(l, currListeners[l]);
    }
}
