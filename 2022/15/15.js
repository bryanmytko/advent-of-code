const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";

const input = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((n) => n !== "");
const coords = [];

input.forEach((line) => {
  const ints = line.match(/(\-?\d+)/gi).map((n) => Number.parseInt(n));
  coords.push({
    sensor: { x: ints[0], y: ints[1] },
    beacon: { x: ints[2], y: ints[3] },
  });
});

console.log(coords);
