const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";

const lines = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((line) => line !== "");

const ROWS = 600;
const COLS = 600;
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

/* Drop sand */
while (1) {
  const drop = [500, 0];

  /* each "second" of sand dropping */
  while (true) {
    const [dropx, dropy] = drop;
    // TODO
    if (grid[dropy][dropx] === "#") break;
    if (grid[dropy + 1][dropx] === "#") break;
  }
}

grid.forEach((row) => {
  // console.log(row.join(""));
});
