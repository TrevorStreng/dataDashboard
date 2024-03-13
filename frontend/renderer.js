// const Chart = require("chart.js");

const {
  totalSalesAmount,
  profitOverTime,
  topProducts,
  monthlySales,
  totalSalesByCountry,
} = require("../backend/dataProcessing");

let data;
let tp;
let monthTotals;
// async function getTotalSales() {
//   return totalSalesAmount();
// }

// async function getTopSoldItems() {
//   return topProducts();
// }

// async function getMonthlyTotals() {
//   monthTotals = await monthlySales();
// }

function getLargestValue() {
  let biggest = 0;
  for (let i = 0; i < monthTotals.length; i++) {
    if (monthTotals[i].profits > biggest) biggest = monthTotals[i].profits;
  }
  return biggest;
}

async function createGraph() {
  // document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("my-chart");
  const ctx = canvas.getContext("2d");

  // Draw x-axis
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();

  // Draw y-axis
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvas.height);
  ctx.stroke();

  // Plot points
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;
  const largestMonthlyProfit = getLargestValue();
  const xAxisScaler = canvas.width / monthTotals.length;
  const yAxisScaler = canvas.height / largestMonthlyProfit;
  for (let i = 0; i < monthTotals.length; i++) {
    // this is because the first month is 12 and the last month is 12
    if (i === 0) {
      ctx.moveTo(
        monthTotals[i].monthNumber - 12,
        canvas.height - monthTotals[i].profits * yAxisScaler
      );
    } else {
      ctx.lineTo(
        monthTotals[i].monthNumber * xAxisScaler,
        canvas.height - monthTotals[i].profits * yAxisScaler
      );
    }
    ctx.stroke();
  }
}

function changeScreen() {
  // remove hidden from main section and add to loading section
  const loadingScreen = document.querySelector(".loading");
  loadingScreen.classList.add("hidden");
  const mainScreen = document.querySelector(".main");
  mainScreen.classList.remove("hidden");
}

async function displayData() {
  try {
    const totalSales = await totalSalesAmount();
    const topItems = await topProducts();
    monthTotals = await monthlySales();
    const salesByCountry = await totalSalesByCountry();

    if (totalSales && topItems && monthTotals && salesByCountry) {
      document.getElementById("data-container").innerText = totalSales;
      document.getElementById("top-items-list").innerHTML = topItems
        .map(
          (item) =>
            `<li><p>item: ${item.product}<p/><p>count: ${item.amount}</p></li>`
        )
        .join("");
      document.getElementById("monthly-sales").innerHTML = monthTotals
        .map(
          (month) =>
            `<li><p>Month: ${month.monthNumber}</p><p>Profit: ${month.profits}</p></li>`
        )
        .join("");
      document.getElementById("sales-by-country").innerHTML = salesByCountry
        .map(
          (country) =>
            `<li><p>Country: ${country.country}</p><p>Amount Sold: ${country.itemCnt}</p></li>`
        )
        .join("");

      createGraph();
      changeScreen();
    } else {
      console.error("Failed to process data..🤬");
    }
  } catch (err) {
    console.error(err);
  }
}

displayData();
