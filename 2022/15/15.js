const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";

const input = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((n) => n !== "");

// https://en.wikipedia.org/wiki/Taxicab_geometry
const taxiCabDiff = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
const coords = [];

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

const findSensorCoverageInRow = (y1) => {
  const seen = new Set();

  coords.forEach((coord) => {
    const { diff } = coord;
    const { x, y } = coord.sensor;

    if (y - diff <= y1 && y1 <= y + diff) {
      seen.add(x);

      for (let i = 1; i < diff / 2; i++) {
        seen.add(x + i);
        seen.add(x - i);
      }
    }
  });

  return seen.size;
};

// Test input
console.log("Part 1.", findSensorCoverageInRow(10));
// console.log("Part 1.", findSensorCoverageInRow(2000000));
// too high?
