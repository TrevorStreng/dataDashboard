// const Chart = require("chart.js");

const {
  totalSalesAmount,
  profitOverTime,
  topProducts,
  monthlySales,
} = require("../backend/dataProcessing");

let data;
let tp;
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
  let monthTotals = await monthlySales();
  let displayBox = document.getElementById("monthly-sales");
  const displayMonthlyTotals = monthTotals.map(
    (month) => `<li><p>${month.monthNumber}</p><p>${month.profits}</p></li>`
  );
  displayBox.innerHTML = displayMonthlyTotals;
}

async function getData() {
  getTotalSales();
  getTopSoldItems();
  getMonthlyTotals();
}

getData();

// async function createGraph() {
//   // const { Chart } = await import("chart.js");
//   tp = await profitOverTime();
//   const ctx = document.getElementById("myChart").getContext("2d");
//   new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: "days",
//       datasets: [
//         {
//           label: "profit over time",
//           data: tp.map((point) => point.price),
//           borderColor: "black",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         xAxes: [
//           {
//             type: "time",
//             time: {
//               unit: "day",
//             },
//           },
//         ],
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     },
//   });
// }

async function createGraph() {
  tp = await profitOverTime();
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: tp.map((point) => point.date), // Assuming each item in tp has a 'date' property
      datasets: [
        {
          label: "profit over time",
          data: tp.map((point) => point.price), // Assuming each item in tp has a 'price' property
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "day",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// createGraph();
