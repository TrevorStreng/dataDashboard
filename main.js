const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, "./preload.js"),
    },
  });

  // mainWindow.webContents.send("totalSalesAmount", value);

  mainWindow.loadFile("./frontend/index.html");
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});
