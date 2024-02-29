// const { ipcRenderer } = require("electron");
// const processData = require("../backend/dataProcessing");

console.log("here");

// ipcRenderer.on("totalSalesAmount", (event, arg) => {
//   // const dataContainer = document.getElementById("data-container");
//   // console.log(totalSalesAmount);
//   // dataContainer.innerText = totalSalesAmount;
//   console.log(arg);
// });

let data = window.electronAPI.data("text");
const dataContainer = document.getElementById("data-container");
dataContainer.innerText = data;
console.log(data);
