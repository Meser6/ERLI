const fs = require("fs");
let converter = require("json-2-csv");

module.exports.createJsonFile = function (filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data), "utf8", (err) => {
    if (err) {
      console.error("Error while saving file JSON", err);
      return;
    }
    console.log("The JSON file has been saved.");
  });
};

module.exports.data = JSON.parse(fs.readFileSync("data1.json", "utf-8"));

module.exports.createCsvFile = async function (data) {
  const csv = await converter.json2csv(data);

  fs.writeFile("rejectedOrders.csv", csv, "utf8", (err) => {
    if (err) {
      console.error("Error while saving file CSV:", err);
      return;
    }
    console.log("The CSV file has been saved.");
  });
};
