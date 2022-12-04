const fs = require("fs");
// const file = "./testInput.txt";
const file = "./input.txt";

const input = fs.readFileSync(file, "utf-8");
let count = 0;
let lineCount = 0;
let noOverlapCount = 0;

const part1 = (line) => {
  const assignments = line.split(",");
  const strange1 = assignments[0].split("-");
  const strange2 = assignments[1].split("-");

  const range1 = strange1.map((n) => parseInt(n));
  const range2 = strange2.map((n) => parseInt(n));

  const r1 = range2[0] >= range1[0] && range2[1] <= range1[1];
  const r2 = range1[0] >= range2[0] && range1[1] <= range2[1];

  if (r1 || r2) count++;
};

const part2 = (line) => {
  lineCount++;
  const assignments = line.split(",");
  const strange1 = assignments[0].split("-");
  const strange2 = assignments[1].split("-");

  const range1 = strange1.map((n) => parseInt(n));
  const range2 = strange2.map((n) => parseInt(n));

  /* Easier to find ones that don't overlap at all */
  const a1 = range2[0] > range1[1];
  const a2 = range2[1] < range1[0];

  const b1 = range1[0] > range2[1];
  const b2 = range2[0] > range1[1];

  if ((a1 || a2) && (b1 || b2)) noOverlapCount++;
};

input.split(/\r?\n/).forEach((line) => {
  if (line === "") return;

  part1(line);
  part2(line);
});

console.log(count);
console.log(lineCount - noOverlapCount);
