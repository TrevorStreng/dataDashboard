const fs = require("fs");
const csv = require("csv-parser");
const { ipcRenderer } = require("electron");
const { finished } = require("stream");

// const results = [];
// fs.createReadStream("./csv/data.csv")
//   .pipe(csv())
//   .on("data", (data) => results.push(data))
//   .on("end", () => console.log(results));

const df = fs.createReadStream("backend/csv/data.csv");

// console.log(df);
async function totalSalesAmount() {
  let totalSalesAmount = 0;
  await new Promise((resolve, reject) => {
    df.pipe(csv())
      .on("data", (row) => {
        const quantity = parseFloat(row.Quantity);
        const unitPrice = parseFloat(row.UnitPrice);
        const saleAmount = quantity * unitPrice;
        totalSalesAmount += saleAmount;
      })
      .on("end", () => {
        totalSalesAmount = totalSalesAmount.toFixed(2);
        resolve(totalSalesAmount);
        console.log("total sales amount: ", totalSalesAmount);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
  return totalSalesAmount;
}

async function profitOverTime() {
  let profits = [];
  let timePrice = {};
  await new Promise((resolve, reject) => {
    df.pipe(csv())
      .on("data", (row) => {
        const price = parseFloat(row.Quantity * row.UnitPrice);
        timePrice = {
          price: price,
          date: row.InvoiceDate,
        };
        profits.push(timePrice);
      })
      .on("end", () => {
        resolve(profits);
        console.log(profits);
      })
      .on("error", (error) => reject(error));
  });
  return profits;
}

// make graph of income over time next

module.exports = { totalSalesAmount, profitOverTime };
