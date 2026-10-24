"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    setProjectTitle: (projectName) => {
        electron_1.ipcRenderer.send("project:set-title", projectName);
    },
});
