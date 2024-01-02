const fs = require("fs");
const file = "./dummyInput.txt";
const input = fs
  .readFileSync(file, "utf-8")
  .split(/\r?\n/)
  .filter((s) => s !== "");

console.log(input);
