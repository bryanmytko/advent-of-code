const fs = require("fs");
const file = "./testInput.txt";
// const file = "./input.txt";
const input = fs.readFileSync(file, "utf-8").split(/\n/);

let grid = input
  .filter((line) => line !== "")
  .map((line) => line.replace("S", "a").replace("E", "{").split(""));

// grid[0][0] = "a";
// grid[2][5] = "{";

// grid[0][20] = "a";
// start: 21, 0
console.log(grid);

const bfs = (root) => {
  let queue = [root];
  const seen = new Set();

  let steps = 0;

  while (queue.length) {
    const curr = queue.shift();
    const { x, y } = curr;

    // if (x === 5 && y === 2) {
    // try {
    if (grid[y][x] === "{") {
      console.log("Part 1.", steps - 1);
      return;
    }
    // } catch (e) {
    //   console.log("x:", x);
    //   console.log("y:", y);
    //   console.log(e);
    //   throw new Error("x");
    // }

    const neighbors = [
      x + 1 < grid[0].length ? { x: x + 1, y } : null,
      x - 1 >= 0 ? { x: x - 1, y } : null,
      y - 1 >= 0 ? { x, y: y - 1 } : null,
      y + 1 < grid.length ? { x, y: y + 1 } : null,
    ];

    neighbors
      .filter((n) => n)
      .forEach((neighbor) => {
        // console.log(seen);
        // console.log(neighbor.x);
        // console.log(neighbor.y);
        // console.log(seen.has(`${neighbor.x},${neighbor.y}`));
        if (!seen.has(`${neighbor.x},${neighbor.y}`)) {
          seen.add(`${neighbor.x},${neighbor.y}`);
          // console.log(queue.length);
          queue.push(neighbor);
          steps += 1;
        }
      });
  }

  throw new Error("Something went wrong, could not reach the peak!");
};

// test input
bfs({ x: 0, y: 0 });

// const visited = new Set();
// const queue = [{ x: 0, y: 0, d: 0 }];
//
// while (queue.length) {
//   const { x, y, d } = queue.shift();
//   const curr = grid[y][x];
//
//   const nextMoves = [
//     x + 1 < grid[0].length ? { x: x + 1, y, d } : null,
//     x - 1 >= 0 ? { x: x - 1, y, d } : null,
//     y - 1 >= 0 ? { x, y: y - 1, d } : null,
//     y + 1 < grid.length ? { x, y: y + 1, d } : null,
//   ];
//
//   for (let i = 0; i < nextMoves.length; i++) {
//     if (!nextMoves[i]) continue;
//
//     const { x, y } = nextMoves[i];
//     if (visited.has(`${x},${y}`)) continue;
//
//     const next = grid[y][x];
//
//     if (next === "E") return console.log("OMG", move.d);
//
//     if (curr >= next) {
//       nextMoves[i].d += 1;
//       visited.add(`${x},${y}`);
//       queue.push(nextMoves[i]);
//     }
//   }
// }
// console.log("----------------------------");
