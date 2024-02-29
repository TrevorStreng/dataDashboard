const processData = require("../backend/dataProcessing");

let data;
async function getData() {
  data = await processData();
  const dataContainer = document.getElementById("data-container");
  dataContainer.innerText = data;
}
getData();
