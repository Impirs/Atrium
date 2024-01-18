const { contextBridge, ipcRenderer } = require("electron");
const { configStore } = require("electron-store");
const os = require("os");

contextBridge.exposeInMainWorld("electron", {
    homeDir: () => os.homedir(),
    osVersion: () => os.arch(),
});

contextBridge.exposeInMainWorld("ipcRenderer", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
    on: (channel, func) =>
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
    once: (channel, func) =>
        ipcRenderer.once(channel, (event, ...args) => func(event, ...args)),
    off: (channel, func) => ipcRenderer.off(channel, func),
});

contextBridge.exposeInMainWorld("configStore", {
    getSecret: () => getStoreValue("name"),
});
