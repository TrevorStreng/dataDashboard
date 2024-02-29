const { contextBridge, ipcRenderer } = require("electron");

// window.ipcRenderer = ipcRenderer; // Expose ipcRenderer to the window object
// ipcRenderer.send("totalSalesAmount", "hello");

contextBridge.exposeInMainWorld("electronAPI", {
  // onUpdateCounter: (callback) =>
  //   ipcRenderer.on("update-counter", (_event, value) => callback(value)),
  // counterValue: (value) => ipcRenderer.send("counter-value", value),
  data: (callback) => {
    ipcRenderer.send("totalSalesAmount", (event, value) => callback(value));
  },
});
