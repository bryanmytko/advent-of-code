const fs = require("fs");
const file = "./input.txt";
const input = fs
  .readFileSync(file, "utf-8")
  .split(/\r?\n/)
  .filter((s) => s !== "");

const dummyInput = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

const symbolPositions = [];
const partNumbers = [];

/* Find symbol positions */
dummyInput.forEach((n, i) => {
  n.split("").forEach((x, idx) =>
    x.match(/[^\d\.+]/) ? symbolPositions.push([i, idx]) : "",
  );
});

console.log(symbolPositions);

const checkAdj = (n, row, col) => {
  console.log("checking:", n, " in column:", col, "at row:", row);
  const offset = ("" + n).length; // length of the number

  for (i = col - 1; i <= col + offset; i++) {
    symbolPositions.forEach((sp) => {
      if (
        (sp[0] === row && sp[1] === col - 1) ||
        (sp[0] === row && sp[1] === col + offset) ||
        (sp[0] === row - 1 && sp[1] === i) ||
        (sp[0] === row + 1 && sp[1] === i)
      )
        partNumbers.push(n);
    });
  }
};

const n = dummyInput[5];

dummyInput.forEach((n, i) => {
  const r = /\d+/g;
  let m;
  while ((m = r.exec(n)) != null) {
    const found = m[0];
    const index = n.indexOf(found);
    console.log("len:", ("" + found).length);
    checkAdj(found, i, index);
    console.log("----------------");
  }
});

console.log(partNumbers.map(Number).reduce((p, v) => p + v));
