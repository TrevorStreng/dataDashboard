const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("node:path");
const processData = require("./backend/dataProcessing");

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     // webPreferences: {
//     //   preload: path.join(__dirname, "preload.js"),
//     // },
//   });

//   win.loadFile("./frontend/index.html");
// };

let value = "helloooo";

const processedData = async () => {
  const data = await processData();
  return data;
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  mainWindow.webContents.send("totalSalesAmount", value);

  mainWindow.loadFile("./frontend/index.html");
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("totalSalesAmount", (event) => value);

// app.on("ready", () => {
// const mainWindow = new BrowserWindow({
//   width: 800,
//   height: 600,
//   webPreferences: {
//     preload: path.join(__dirname, "preload.js"),
//   },
// });
// mainWindow.webContents.send("totalSalesAmount", "helloooo");
// mainWindow.loadFile("./frontend/index.html");
// ipcRenderer.on("totalSalesAmount", (event, processedData) => {
//   console.log(processedData);
// });
// ipc.on("totalSalesAmount", (event, message) => {
//   console.log(message);
// });
// });

// ipcMain.on("totalSalesAmount", (event, arg) => {
//   // console.log(arg);
//   ipcRenderer.on("totalSalesAmount", "helloo");
// });
