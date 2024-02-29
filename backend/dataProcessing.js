const fs = require("fs");
const csv = require("csv-parser");
const { ipcRenderer } = require("electron");

// const results = [];
// fs.createReadStream("./csv/data.csv")
//   .pipe(csv())
//   .on("data", (data) => results.push(data))
//   .on("end", () => console.log(results));

function processData() {
  // let totalSalesAmount = 0;
  // await new Promise((resolve, reject) => {
  //   fs.createReadStream("backend/csv/data.csv")
  //     .pipe(csv())
  //     .on("data", (row) => {
  //       const quantity = parseFloat(row.Quantity);
  //       const unitPrice = parseFloat(row.UnitPrice);
  //       const saleAmount = quantity * unitPrice;
  //       totalSalesAmount += saleAmount;
  //     })
  //     .on("end", () => {
  //       totalSalesAmount = totalSalesAmount.toFixed(2);
  //       resolve(totalSalesAmount);
  //       console.log("total sales amount: ", totalSalesAmount);
  //     })
  //     .on("error", (error) => {
  //       reject(error);
  //     });
  //   // return totalSalesAmount;
  //   // ipcRenderer.send("totalSalesAmount", totalSalesAmount);
  // });
  // return totalSalesAmount;
  // ipcRenderer.on("totalSalesAmount", "heelo");
  return "heelo";
}
processData();
// module.exports = processData;
