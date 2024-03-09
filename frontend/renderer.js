// const Chart = require("chart.js");

const {
  totalSalesAmount,
  profitOverTime,
  topProducts,
  monthlySales,
} = require("../backend/dataProcessing");

let data;
let tp;
let monthTotals;
async function getTotalSales() {
  data = await totalSalesAmount();
  const dataContainer = document.getElementById("data-container");
  dataContainer.innerText = data;
}

async function getTopSoldItems() {
  let items = await topProducts();
  const topItemsList = document.getElementById("top-items-list");
  const listItems = items.map((item) => `<li>${item}</li>`);
  topItemsList.innerHTML = listItems.join("");
}

async function getMonthlyTotals() {
  monthTotals = await monthlySales();
  console.log(monthTotals);
  let displayBox = document.getElementById("monthly-sales");
  const displayMonthlyTotals = monthTotals.map(
    (month) => `<li><p>${month.monthNumber}</p><p>${month.profits}</p></li>`
  );
  displayBox.innerHTML = displayMonthlyTotals;
  createGraph();
}

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

async function getData() {
  getTotalSales();
  getTopSoldItems();
  getMonthlyTotals();
}

getData();
