const fs = require("fs");
// const file = "./testInput2.txt";
const file = "./input.txt";

const input = fs.readFileSync(file, "utf-8");

const moveTail = (h, t) => {
  const diffx = h.x - t.x;
  const diffy = h.y - t.y;

  if (Math.abs(diffx) > 1) {
    t.x += diffx > 0 ? 1 : -1;
    if (diffy != 0) t.y += diffy > 0 ? 1 : -1;
  } else if (Math.abs(diffy) > 1) {
    t.y += diffy > 0 ? 1 : -1;
    if (diffx != 0) t.x += diffx > 0 ? 1 : -1;
  }

  return { x: t.x, y: t.y };

  throw new Error("The rope moved too far, something is wrong.");
};

const solve = (ropeLength) => {
  const knots = new Array(ropeLength).fill({ x: 0, y: 0 });
  const tracked = ["0,0"];

  input.split(/\r?\n/).forEach((line) => {
    if (line === "") return;
    const [dir, amt] = line.split(" ");

    /* Move T */
    for (let i = 0; i < amt; i++) {
      switch (dir) {
        case "R":
          knots[0].x++;
          break;
        case "L":
          knots[0].x--;
          break;
        case "U":
          knots[0].y++;
          break;
        case "D":
          knots[0].y--;
          break;
      }

      /* Part 1. Move H */
      for (let j = 1; j < ropeLength; j++) {
        knots[j] = moveTail(knots[j - 1], knots[j]);
        if (j === ropeLength - 1) tracked.push(`${knots[j].x},${knots[j].y}`);
      }
    }
  });
  console.log(tracked);
  return [...new Set(tracked)].length;
};

console.log("Part 1.", solve(2));
console.log("Part 2.", solve(10));

// For testing:
//
// const draw = (h, t) => {
//   const grid = [
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//     Array(10).fill(0),
//   ];
//
//   grid[h.y][h.x] = 1;
//   grid[t.y][t.x] = 2;
//
//   console.log(grid.reverse());
// };
//
// First draft
//
// On top of each other, don't need to move
// if (h.x === t.x && h.y === t.y) return t;
//
// // Close enough...
// if (h.x - t.x <= 1 && h.x - t.x >= -1 && h.y - t.y <= 1 && h.y - t.y >= -1)
//   return t;
// x, y only
// if (h.x - t.x > 1 && h.y - t.y === 0) return { x: t.x + 1, y: t.y };
// if (h.x - t.x < -1 && h.y - t.y === 0) return { x: t.x - 1, y: t.y };
// if (h.x - t.x === 0 && h.y - t.y > 1) return { x: t.x, y: t.y + 1 };
// if (h.x - t.x === 0 && h.y - t.y < -1) return { x: t.x, y: t.y - 1 };
//
// // diagonals
// if (h.x - t.x >= 1 && h.y - t.y > 1) return { x: t.x + 1, y: t.y + 1 };
// if (h.x - t.x <= -1 && h.y - t.y < -1) return { x: t.x - 1, y: t.y - 1 };
// if (h.x - t.x <= -1 && h.y - t.y > 1) return { x: t.x - 1, y: t.y + 1 };
// if (h.x - t.x >= 1 && h.y - t.y < -1) return { x: t.x + 1, y: t.y - 1 };
//
// if (h.x - t.x > 1 && h.y - t.y >= 1) return { x: t.x + 1, y: t.y + 1 };
// if (h.x - t.x > 1 && h.y - t.y <= -1) return { x: t.x + 1, y: t.y - 1 };
// if (h.x - t.x < -1 && h.y - t.y >= 1) return { x: t.x - 1, y: t.y + 1 };
// if (h.x - t.x < -1 && h.y - t.y <= -1) return { x: t.x - 1, y: t.y - 1 };
