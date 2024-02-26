const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.on("ready", () => {
  const win = new BrowserWindow();

  win.loadFile("index.html");

  ipcMain.on("totalSalesAmount", (event, totalSalesAmount) => {
    win.webContents.send("totalSalesAmount", totalSalesAmount);
  });
});
