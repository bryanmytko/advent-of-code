const fs = require("fs");
const file = "./input.txt";
const input = fs.readFileSync(file, "utf-8");

const reportCycles = [20, 60, 100, 140, 180, 220];
const report = [];
const CRT = new Array(6 * 40).fill(".");

let cycle = 1;
let X = 1;

const processCycle = () => {
  cycle++;
  if (reportCycles.includes(cycle)) report.push(cycle * X);
};

const draw = () => {
  const scrPtr = (cycle - 1) % 40;
  if (scrPtr === X - 1 || scrPtr === X || scrPtr === X + 1)
    CRT[cycle - 1] = "#";
};

input.split("\n").forEach((line) => {
  const [instruction, valueStr] = line.split(" ");
  const value = parseInt(valueStr);

  draw();
  processCycle();

  if (instruction !== "noop") {
    draw();
    X += value;
    processCycle();
  }
});

console.log(
  "Part 1.",
  report.reduce((a, b) => a + b)
);

console.log("Part 2.");

// Chunk array helper: https://stackoverflow.com/questions/8495687/split-array-into-chunks
const screen = CRT.reduce((all, one, i) => {
  const ch = Math.floor(i / 40);
  all[ch] = [].concat(all[ch] || [], one);
  return all;
}, []);

screen.forEach((row) => console.log(row.join("")));

// const processCycle = () => {
//   console.log("cycle: ", cycle, " | X: ", X, " | CRT draws: ", cycle % 40);
//   cycle++;
//   if (reportCycles.includes(cycle)) report.push(cycle * X);
// };
// let noteCycle = 20;
// let signal = 0;

// const check = () => {
//   if (cycle === noteCycle) {
//     signal += cycle * X;
//     noteCycle += 40;
//   }
// };

// const [instruction, valueStr] = instructions[i];
// const value = parseInt(valueStr);
//
// draw();
// cycle++;
// check();
//
// // if (reportCycles.includes(cycle)) report.push(cycle * X);
//
// if (instruction === "addx") {
//   draw();
//   X += value;
//   cycle++;
//   // processCycle(cycle);
//   // stack.push(value);
// }
// check();
// draw();
//
// // if (reportCycles.includes(cycle)) report.push(cycle * X);
// // draw();
// // processCycle(cycle);
// }
//
