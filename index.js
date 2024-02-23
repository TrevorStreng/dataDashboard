const fs = require("fs");
const csv = require("csv-parser");
const { ipcRenderer } = require("electron");

// const results = [];
// fs.createReadStream("./csv/data.csv")
//   .pipe(csv())
//   .on("data", (data) => results.push(data))
//   .on("end", () => console.log(results));

let totalSalesAmount = 0;
fs.createReadStream("./csv/data.csv")
  .pipe(csv())
  .on("data", (row) => {
    const quantity = parseFloat(row.Quantity);
    const unitPrice = parseFloat(row.UnitPrice);

    const saleAmount = quantity * unitPrice;

    totalSalesAmount += saleAmount;
  })
  .on("end", () => console.log(totalSalesAmount.toFixed(2)));

ipcRenderer.send("totalSalesAmount", totalSalesAmount);
