const fs = require("fs");
const file = "./input.txt";
// const file = "./testInput.txt";

const lines = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((line) => line !== "");

const ROWS = 550;
const COLS = 1000;
const grid = [];

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

let dropCount = 0;

const main = async () => {
  while (true) {
    let drop = [500, 0];
    let [x, y] = drop;

    dropCount++;
    console.log(dropCount);
    try {
      while (true) {
        if (grid[y][x] === ".") {
          console.log(dropCount, "air...");
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
    } catch (e) {
      // This is mega-hacky but catches when our sand falls in to "infinity"
      // by being out of bounds.
      console.log("Answer:", dropCount - 1);
      throw new Error("Meh...");
    }
  }
};

main();

/* DEV draw */
// grid.forEach(async (row, index) => {
//   if (index > 18) return;
//   const x = row.filter((_, index) => index > 400).join("");
//   console.log(x);
// });
