const fs = require("fs");
const file = "./input.txt";
// const file = "./testInput.txt";

const lines = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((line) => line !== "");

const ROWS = 400;
const COLS = 400;
// const ROWS = 20;
// const COLS = 20;
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

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const main = async () => {
  /* Drop sand */
  while (1) {
    // const drop = [500, 0];
    let drop = [6, 0];

    /* each "second" of sand dropping */
    while (true) {
      const [dropx, dropy] = drop;

      /* Draw */
      console.clear();
      console.log(drop);
      grid.forEach((row) => {
        console.log(row.join(""));
      });
      await timer(100);

      drop[1]++;

      // hit air
      if (grid[dropy + 1][dropx] === ".") {
        console.log("air...");
      } else if (grid[dropy + 1][dropx - 1] === ".") {
        console.log("hit wall, fall left");
        grid[dropy + 1][dropx - 1] = "o";
        break;
      } else if (grid[dropy + 1][dropx + 1] === ".") {
        console.log("hit wall, fall right");
        grid[dropy + 1][dropx + 1] = "o";
        break;
      } else {
        console.log("hit wall, fall left");
        grid[dropy][dropx] = "o";
        break;
      }
      //
      // // hit a rock with something to the right and nothing to the left
      // else if (
      //   grid[dropy + 1][dropx] === "o" &&
      //   grid[dropy + 1][dropx + 1] !== "."
      // ) {
      //   grid[dropy + 1][dropx + 1] = "o";
      //   continue;
      // }
      //
      // // hit a rock with something to the left and right
      // else if (grid[dropy + 1][dropx] === "o") {
      //   grid[dropy][dropx] = "o";
      //   continue;
      // } else break;
    }
  }
};

// main();

grid.forEach((row) => {
  console.log(row.join(""));
});
