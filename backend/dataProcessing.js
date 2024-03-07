const fs = require("fs");
const csv = require("csv-parser");
const { ipcRenderer } = require("electron");
const { finished } = require("stream");

// const results = [];
// fs.createReadStream("./csv/data.csv")
//   .pipe(csv())
//   .on("data", (data) => results.push(data))
//   .on("end", () => console.log(results));

const df = fs.createReadStream("csv/data.csv");

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

async function topProducts() {
  const productArr = [];
  const productCnt = [];
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
                console.log("made it here");
                mostSold.splice(mostSold[mostSoldSearchIndex - 1], 0, i - 1);
                mostSold.pop();
                mostSoldSearchIndex = -1; // this exits the while loop
              }
              mostSoldSearchIndex--;
            } else if (
              productCnt[i] < mostSold[mostSoldSearchIndex] &&
              productCnt[i] > mostSold[mostSoldSearchIndex - 1]
            ) {
              console.log("made it here");
              mostSold.splice(mostSold[mostSoldSearchIndex - 1], 0, i - 1);
              mostSold.pop();
              mostSoldSearchIndex = -1; // this exits the while loop
            } else {
              mostSoldSearchIndex = -1; // this exits the while loop
            }
            // console.log(mostSoldSearchIndex);
          }
          console.log(mostSold);
        }
        let topProductArr = [];
        for (let i = 0; i < numOfTopProducts; i++) {
          topProductArr.push(productArr[mostSold[i]]);
        }
        resolve(topProductArr);
        console.log(topProductArr);
      });
  });
}

topProducts();

// make graph of income over time next

module.exports = { totalSalesAmount, profitOverTime };
