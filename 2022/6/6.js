const fs = require("fs");
const file = "./input.txt";

const input = fs.readFileSync(file, "utf-8");

// Pt 1. const CODE_LEN = 4;
// Pt 2. const CODE_LEN = 14;
const CODE_LEN = 14;

let count = CODE_LEN;
const dp = input.slice(0, CODE_LEN).split("");

for (let i = 0; i < input.length; i++) {
  if ([...new Set(dp)].length === CODE_LEN) break;

  dp.shift();
  dp.push(input[CODE_LEN + i]);
  count++;
}

console.log(count);
