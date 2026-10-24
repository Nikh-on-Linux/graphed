import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electronAPI", {
  setProjectTitle: (projectName: string) => {
    ipcRenderer.send("project:set-title", projectName)
  },
})