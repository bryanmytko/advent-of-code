const fs = require("fs");
const file = "./input.txt";
// const file = "./testInput.txt";

const lines = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((line) => line !== "");

const ROWS = 800;
const COLS = 800;

const grid = [];
const ground = new Array(ROWS).fill("#");

let dropCount = 0;

for (let i = 0; i < COLS; i++) {
  grid.push(new Array(ROWS).fill("."));
}

/* Process the input by filling in the coords in ranges provided */
lines.forEach((line) => {
  if (line === "" || line.startsWith("#")) return;
  const coords = line.split(" -> ").map((c) => c.split(",").map(Number));
  let [x, y] = coords[0];
  grid[y][x] = "#";

  coords.slice(1).forEach((coord) => {
    let [coordx, coordy] = coord;

    while (x !== coordx || y !== coordy) {
      if (x !== coordx) {
        const diffx = coordx - x;
        x += diffx > 0 ? 1 : -1;
        grid[y][x] = "#";
      }
      if (y !== coordy) {
        const diffy = coordy - y;
        y += diffy > 0 ? 1 : -1;
        grid[y][x] = "#";
      }
    }
  });
});

const lastMeaningfulRowIndex = Number.parseInt(
  grid
    .map((row, index) => ([...new Set(row)].length > 1 ? index : false))
    .filter((row) => row)
    .slice(-1)
);

grid[lastMeaningfulRowIndex + 2] = ground;

const main = (hasFloor = false) => {
  while (true) {
    let drop = [500, 0];
    let [x, y] = drop;

    dropCount++;

    if (grid[0][500] === "o") return dropCount;

    while (true) {
      if (y === lastMeaningfulRowIndex && !hasFloor) return dropCount - 1;

      if (grid[y][x] === ".") {
        grid[y][x] = "o";
      } else if (grid[y + 1][x] === ".") {
        grid[y][x] = ".";
        y++;
        grid[y][x] = "o";
      } else if (grid[y + 1][x - 1] === ".") {
        grid[y][x] = ".";
        y++;
        x--;
        grid[y][x] = "o";
      } else if (grid[y + 1][x + 1] === ".") {
        grid[y][x] = ".";
        y++;
        x++;
        grid[y][x] = "o";
      } else break;
    }
  }
};

console.log("Part 1.", main());
console.log("Part 2.", main(true));
