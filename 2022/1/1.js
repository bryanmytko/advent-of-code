const fs = require("fs");
const file = "./input.txt";
// const file = "./testInput.txt";

const input = fs.readFileSync(file, "utf-8");

let topThree = [0, 0, 0];
let curSum = 0;

input.split(/\r?\n/).forEach((line) => {
  if (line === "") {
    if (curSum > topThree[0]) {
      topThree.push(curSum);
      topThree.sort();
      topThree.shift();
    }

    return (curSum = 0);
  }

  curSum += parseInt(line);
});

/* This is Part 2.
 * For Part 1, just sum between empty lines and update if greater than
 * the value that's currently the greatest. */
console.log(topThree);
console.log(topThree.reduce((p, v) => p + v));
