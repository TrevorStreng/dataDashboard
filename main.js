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

// app.whenReady().then(() => {
//   ipcMain.handle("ping", () => "pong");
//   createWindow();

//   // this is for MacOS to open the window
//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });

// let totalSalesAmount = 0;

// ipcMain.on("getTotalSalesAmount", (event) => {
//   event.reply("totalSalesAmount", totalSalesAmount);
// });

app.on("ready", () => {
  const win = new BrowserWindow();

  win.loadFile("index.html");

  ipcMain.on("totalSalesAmount", (event, totalSalesAmount) => {
    win.webContents.send("totalSalesAmount", totalSalesAmount);
  });
});
