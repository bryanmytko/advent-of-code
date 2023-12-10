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

const gears = [];
const numPositions = [];

const checkAdj = (starPos) => {
  const [starRow, starCol] = starPos;
  const adjFound = [];

  /* For each found number, check if OUR star is around it*/
  for (i = 0; i < numPositions.length; i++) {
    const num = numPositions[i];
    if (
      (num.row === starRow && num.col + num.len === starCol) ||
      (num.row === starRow && num.col === starCol + 1)
    ) {
      adjFound.push(num.val);
      continue;
    }

    for (j = 0; j < num.len; j++) {
      if (
        (num.row === starRow - 1 && num.col + j === starCol - 1) ||
        (num.row === starRow - 1 && num.col + j === starCol) ||
        (num.row === starRow - 1 && num.col + j === starCol + 1) ||
        (num.row === starRow + 1 && num.col + j === starCol - 1) ||
        (num.row === starRow + 1 && num.col + j === starCol) ||
        (num.row === starRow + 1 && num.col + j === starCol + 1)
      ) {
        adjFound.push(num.val);
        break;
      }
    }
  }

  if (adjFound.length === 2)
    gears.push(Number(adjFound[0]) * Number(adjFound[1]));
};

input.forEach((n, i) => {
  const r = /\d+/g;
  let m;
  while ((m = r.exec(n)) != null) {
    const found = m[0];
    numPositions.push({ row: i, col: m.index, len: found.length, val: found });
  }
});

/* Check stars */
input.forEach((n, i) => {
  n.split("").forEach((x, idx) => {
    if (x.match(/[*]/)) {
      const starPos = [i, idx];
      checkAdj(starPos);
    }
  });
});

console.log(
  "Part II:",
  gears.reduce((p, v) => p + v, 0),
);
