const fs = require("fs");
// const file = "./testInput.txt";
const file = "./input.txt";
const input = fs.readFileSync(file, "utf-8").split(/\n/);

let grid = input.filter((line) => line !== "").map((line) => line.split(""));
const alphabet = Array.from(Array(26))
  .map((_, i) => i + 97)
  .map((n) => String.fromCharCode(n));

alphabet.push("E");
alphabet.unshift("S");

const bfs = (root, goal, alpha) => {
  let queue = [root];
  const visited = new Set();

  while (queue.length) {
    const curr = queue.shift();
    const { x, y, s } = curr;

    if (visited.has(`${x},${y}`)) continue;
    visited.add(`${x},${y}`);

    const neighbors = [
      x + 1 < grid[0].length ? { x: x + 1, y } : null,
      x - 1 >= 0 ? { x: x - 1, y } : null,
      y - 1 >= 0 ? { x, y: y - 1 } : null,
      y + 1 < grid.length ? { x, y: y + 1 } : null,
    ];

    for (let j = 0; j < neighbors.length; j++) {
      if (!neighbors[j]) continue;
      const current = alpha.indexOf(grid[y][x]);
      const next = alpha.indexOf(grid[neighbors[j].y][neighbors[j].x]);

      if (current >= next - 1) {
        queue.push({ ...neighbors[j], s: s + 1 });
        if (grid[neighbors[j].y][neighbors[j].x] === goal) {
          return console.log("Answer:", s - 1);
        }
      }
    }
  }
};

// Part 1.
const row1 = grid.findIndex((row) => row.includes("S"));
const col1 = grid[row1].findIndex((n) => n === "S");
const start = { x: col1, y: row1 };

bfs({ ...start, s: 0 }, "E", alphabet);

// Part 2.
// Find E, start from the end and BFS for a
const row2 = grid.findIndex((row) => row.includes("E"));
const col2 = grid[row2].findIndex((n) => n === "E");
const end = { x: col2, y: row2 };

bfs({ ...end, s: 0 }, "a", alphabet.reverse());
