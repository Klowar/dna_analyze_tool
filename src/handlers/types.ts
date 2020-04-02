// Type of listener ipcMain
export type ListenerType = (event: Electron.IpcMainEvent, ...args: any[]) => void;
// Type of handler ipcMain
export type HandlerType<T> = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => Promise<T>;
