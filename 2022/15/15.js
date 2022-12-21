const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";

const input = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((n) => n !== "");
const coords = [];

input.forEach((line) => {
  const nums = line.match(/(\-?\d+)/gi).map(Number);

  coords.push({
    sensor: { x: nums[0], y: nums[1] },
    beacon: { x: nums[2], y: nums[3] },
  });
});

console.log(coords);
