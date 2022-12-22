const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";

const input = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((n) => n !== "");
const coords = [];

// https://en.wikipedia.org/wiki/Taxicab_geometry
const taxiCabDiff = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
const seen = new Set();

input.forEach((line) => {
  const nums = line.match(/(\-?\d+)/gi).map(Number);
  const sensor = { x: nums[0], y: nums[1] };
  const beacon = { x: nums[2], y: nums[3] };

  coords.push({
    sensor,
    beacon,
    diff: taxiCabDiff(sensor, beacon),
  });
});

coords.forEach((coord) => {
  const { x, y } = coord.sensor;
  // 2,18
  // grid[18][2]
  for (i = 0; i < coord.diff; i++) {
    seen.add([x + i, y]);
    seen.add([x - i, y]);
    seen.add([x + i, y + i]);
    seen.add([x + i, y - i]);
  }
});

console.log(coords);
