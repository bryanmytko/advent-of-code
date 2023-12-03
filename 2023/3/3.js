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
input.forEach((n, i) => {
  n.split("").forEach((x, idx) =>
    x.match(/[^\d\.]/) ? symbolPositions.push([i, idx]) : "",
  );
});

const checkAdj = (n, row, col) => {
  const offset = n.length;
  let foundPart;

  for (i = col - 1; i <= col + offset; i++) {
    if (!!foundPart) break;
    for (j = 0; j < symbolPositions.length; j++) {
      if (
        (symbolPositions[j][0] === row && symbolPositions[j][1] === col - 1) ||
        (symbolPositions[j][0] === row &&
          symbolPositions[j][1] === col + offset) ||
        (symbolPositions[j][0] === row - 1 && symbolPositions[j][1] === i) ||
        (symbolPositions[j][0] === row + 1 && symbolPositions[j][1] === i)
      ) {
        foundPart = n;
      }
    }
  }

  foundPart && partNumbers.push(foundPart);
};

input.forEach((n, i) => {
  const r = /\d+/g;
  let m;
  while ((m = r.exec(n)) != null) {
    const found = m[0];

    checkAdj(found, i, m.index);
  }
});

console.log(
  "Part I:",
  partNumbers.map(Number).reduce((p, v) => p + v, 0),
);
