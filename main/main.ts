import { app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';

const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar:true,
        title:"Graphed",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (isDev) {
        win.loadURL('http://localhost:3000/');
    } else {
        win.loadFile(path.join(__dirname, '../../renderer/out/index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on("project:set-title", (event, projectName: string) => {
  const window = BrowserWindow.fromWebContents(event.sender)

  if (!window) return

  window.setTitle(`${projectName} - graphed`)
})
