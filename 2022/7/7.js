const fs = require("fs");
// const file = "./testInput.txt";
const file = "./input.txt";

const TOTAL_SIZE = 70000000;
const REQ_SIZE = 30000000;
const MAX_VAL = 100000;
const input = fs.readFileSync(file, "utf-8");
const lines = input.split(/\r?\n/);

const dirs = {};
const pathHistory = [];

lines.forEach((line) => {
  const reNum = /\d+/;
  if (line.match(reNum)) {
    const value = Number(line.match(reNum)[0]);
    const currPath = [];

    pathHistory.forEach((dir) => {
      currPath.push(dir);
      const dirCount = dirs[currPath.join("/")] ?? 0;
      dirs[currPath.join("/")] = dirCount + value;
    });
  }

  if (line.startsWith("$ cd")) {
    const dir = line.split(" ")[2];

    if (dir === "..") return pathHistory.pop();
    pathHistory.push(dir);
  }
});

// Part 1.
const sizes = Object.values(dirs);
const inRange = sizes.filter((d) => d <= MAX_VAL);
console.log(
  "Part 1.",
  inRange.reduce((prev, val) => prev + val)
);

// Part 2.
const sorted = sizes.sort((a, b) => b - a);
const free = TOTAL_SIZE - sorted[0];
const required = REQ_SIZE - free;

console.log(
  "Part 2.",
  sorted.reverse().find((n) => n >= required)
);

// Attempt 2
//
// const dirs = [{ name: "/", value: 0, children: [], parent: null }];

// let curr_dir = dirs[0];

// const findParent = (obj = {}, key, value) => {
//   const result = [];
//   const recursiveSearch = (obj = {}) => {
//     if (!obj || typeof obj !== "object") {
//       return;
//     }
//     if (obj[key] === value) {
//       result.push(obj);
//     }
//     Object.keys(obj).forEach(function (k) {
//       recursiveSearch(obj[k]);
//     });
//   };
//
//   recursiveSearch(obj);
//   return result[0];
// };
//
// lines.forEach((line, index) => {
//   if (index < 2) return;
//
//   if (line.startsWith("$ cd")) {
//     /* Make note of this dir if it hasn't been seen */
//     const dir_name = line.split(" ")[2];
//
//     if (dir_name === "..") {
//       curr_dir = findParent(dirs, "name", curr_dir.parent);
//       if (!curr_dir) curr_dir = dirs[0];
//     } else {
//       if (!curr_dir.children.some((c) => c.name === dir_name)) {
//         curr_dir.children.push({
//           name: dir_name,
//           value: 0,
//           children: [],
//           parent: curr_dir.name,
//         });
//       }
//       const foundChild = curr_dir.children.find((c) => c.name === dir_name);
//       if (!foundChild) throw new Error("here");
//       curr_dir = foundChild;
//     }
//   }
//
//   if (line.startsWith("$ ls")) {
//     for (let i = index + 1; i < lines.length; i++) {
//       const num = lines[i].match(/(\d+)+/gi);
//       if (num) curr_dir.value += parseInt(num[0]);
//       if (lines[i].startsWith("$")) break;
//     }
//   }
// });
//
// const sumChildren = (obj) => {
//   if (!obj.children.length) {
//     console.log("returning: ", obj.value);
//     return obj.value;
//   }
//
//   obj.children.forEach((child) => {
//     obj.value += sumChildren(child);
//   });
// };
//
// sumChildren(dirs[0]);
//
// console.dir(dirs, { depth: null });
