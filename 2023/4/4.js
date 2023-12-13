const fs = require("fs");
const file = "./input.txt";
const input = fs
  .readFileSync(file, "utf-8")
  .split(/\r?\n/)
  .filter((s) => s !== "");

const dummyInput = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

const totalPoints = input.map((i) => {
  const cardId = i.match(/Card\s+(\d)/)[1];
  const winningNums = i
    .match(/\:\s+([0-9].*?)\|/)[1]
    .split(/\s+/)
    .slice(0, -1);
  const myNums = i.match(/\|\s+([0-9].*)/)[1].split(/\s+/);
  const matches = myNums.filter((n) => winningNums.includes(n));

  return matches.length ? Math.pow(2, matches.length - 1) : 0;
});

console.log(
  "Part I:",
  totalPoints.reduce((p, v) => p + v),
);
