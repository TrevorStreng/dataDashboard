const fs = require("fs");
const csv = require("csv-parser");
const { ipcRenderer } = require("electron");
const { finished } = require("stream");
const { resolve } = require("path");

// const results = [];
// fs.createReadStream("./csv/data.csv")
//   .pipe(csv())
//   .on("data", (data) => results.push(data))
//   .on("end", () => console.log(results));

// const df = fs.createReadStream("backend/csv/data.csv");
// const df = fs.createReadStream("csv/data.csv"); // use this one when running only this file

// console.log(df);
async function totalSalesAmount() {
  const df = fs.createReadStream("backend/csv/data.csv");
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
        // console.log("total sales amount: ", totalSalesAmount);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
  return totalSalesAmount;
}

async function profitOverTime() {
  const df = fs.createReadStream("backend/csv/data.csv");
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
      })
      .on("error", (error) => reject(error));
  });
  return profits;
}

async function topProducts() {
  const df = fs.createReadStream("backend/csv/data.csv");
  let productArr = [];
  let productCnt = [];
  let topProductArr = [];
  await new Promise((resolve, reject) => {
    df.pipe(csv())
      .on("data", (row) => {
        if (!productArr.includes(row.Description)) {
          productArr.push(row.Description);
          productCnt.push(1); // product count is at the same index as the product in productArr
        } else {
          const arrIndex = productArr.indexOf(row.Description);
          productCnt[arrIndex]++;
        }
      })
      .on("end", () => {
        // find the index of the top 3-5 products
        const mostSold = [];
        const numOfTopProducts = 5;
        for (let i = 0; i < numOfTopProducts; i++) {
          // init most sold to all 0's
          mostSold.push(0);
        }
        for (let i = 0; i < productCnt.length; i++) {
          let mostSoldSearchIndex = numOfTopProducts - 1;
          while (mostSoldSearchIndex >= 0) {
            if (productCnt[i] > mostSold[mostSoldSearchIndex]) {
              if (mostSoldSearchIndex === 0) {
                // inserts first value
                mostSold.splice(mostSold[mostSoldSearchIndex - 1], 0, i - 1);
                mostSold.pop();
                mostSoldSearchIndex = -1; // this exits the while loop
              }
              mostSoldSearchIndex--;
            } else if (
              productCnt[i] < mostSold[mostSoldSearchIndex] &&
              productCnt[i] > mostSold[mostSoldSearchIndex - 1]
            ) {
              mostSold.splice(mostSold[mostSoldSearchIndex - 1], 0, i - 1);
              mostSold.pop();
              mostSoldSearchIndex = -1; // this exits the while loop
            } else {
              mostSoldSearchIndex = -1; // this exits the while loop
            }
            // console.log(mostSoldSearchIndex);
          }
        }
        for (let i = 0; i < numOfTopProducts; i++) {
          topProductArr.push(productArr[mostSold[i]]);
        }
        resolve(topProductArr);
      })
      .on("error", (error) => reject(error));
  });
  return topProductArr;
}

async function monthlySales() {
  const df = fs.createReadStream("backend/csv/data.csv");
  let monthlyTotals = [];
  let monthTotal = 0;
  let prevMonthNumber; // month number 1-12
  let newMonthNumber; // month number 1-12
  await new Promise((resolve, reject) => {
    df.pipe(csv())
      .on("data", (row) => {
        newMonthNumber = row.InvoiceDate.split("/")[0];
        if (
          newMonthNumber !== prevMonthNumber &&
          prevMonthNumber !== undefined
        ) {
          monthData = {
            monthNumber: prevMonthNumber,
            profits: monthTotal,
          };
          monthlyTotals.push(monthData);
          monthTotal = 0;
        }
        monthTotal += row.Quantity * row.UnitPrice;
        prevMonthNumber = newMonthNumber;
      })
      .on("end", () => {
        monthData = {
          monthNumber: prevMonthNumber,
          profits: monthTotal,
        };
        monthlyTotals.push(monthData);
        resolve(monthlyTotals);
      })
      .on("error", (error) => reject(error));
  });
  return monthlyTotals;
}

// implement a function that counts how many instances of an item have sold in different countries

module.exports = {
  totalSalesAmount,
  profitOverTime,
  topProducts,
  monthlySales,
};
