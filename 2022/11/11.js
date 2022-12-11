const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";
const input = fs.readFileSync(file, "utf-8");

input.split("\n").forEach((line) => {
  console.log(line);
});
