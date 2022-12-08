const fs = require("fs");
// const file = "./testInput.txt";
const file = "./input.txt";
const input = fs.readFileSync(file, "utf-8");

/* Create the matrix */
const dp = [];
input.split(/\r?\n/).forEach((line) => {
  if (line === "") return;
  const row = [];

  line.split("").forEach((l) => row.push(parseInt(l)));
  dp.push(row);
});

let visible = 0;
const scenicScores = [];

// Part 2.
dp.forEach((row, rowIndex) => {
  /* If it's first or last row we will get a zero which will zero out the scenic score */
  if (rowIndex === 0 || rowIndex + 1 === dp.length) return;

  for (let i = 0; i < row.length; i++) {
    /* If it's on the edge same as above */
    if (i === 0 || i + 1 === row.length) continue;

    const th = row[i];
    // Left, Right, Up, Down
    const scores = [0, 0, 0, 0];

    for (let j = i - 1; j >= 0; j--) {
      scores[0]++;
      if (dp[rowIndex][j] >= th) break;
    }

    for (let j = i + 1; j < row.length; j++) {
      scores[1]++;
      if (dp[rowIndex][j] >= th) break;
    }

    for (let j = rowIndex - 1; j >= 0; j--) {
      scores[2]++;
      if (dp[j][i] >= th) break;
    }

    for (let j = rowIndex + 1; j < dp.length; j++) {
      scores[3]++;
      if (dp[j][i] >= th) break;
    }

    scenicScores.push(scores.reduce((a, b) => a * b));
  }
});

// Part 1.
dp.forEach((row, rowIndex) => {
  /* If it's first or last row, every one is visible */
  if (rowIndex === 0 || rowIndex + 1 === dp.length)
    return (visible += row.length);

  for (let i = 0; i < row.length; i++) {
    /* If it's on the edge, it's visible */
    if (i === 0 || i + 1 === row.length) {
      visible++;
      continue;
    }

    const th = row[i];

    // Left
    const left = row.slice(0, i).every((r) => th > r);
    // Right
    const right = row.slice(i + 1, row.length).every((r) => th > r);
    // Upper
    const upperCol = [];
    for (j = rowIndex - 1; j >= 0; j--) {
      upperCol.push(dp[j][i]);
    }
    const upper = upperCol.every((c) => th > c);
    // Down
    const downCol = [];
    for (j = rowIndex + 1; j < dp.length; j++) {
      downCol.push(dp[j][i]);
    }
    const down = downCol.every((c) => th > c);

    // Check for visiblity in any row or col
    if ([left, right, upper, down].flat().some((n) => n)) {
      visible++;
    }
  }
});

console.log("Part 1.", visible);
console.log("Part 2.", scenicScores.sort((a, b) => b - a)[0]);
