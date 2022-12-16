const fs = require("fs");
// const file = "./testInput.txt";
const file = "./input.txt";

const lines = fs.readFileSync(file, "utf-8").split(/\n/);
const ordered = [];
let count = 0;

const compare = (left, right) => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left === right) return 0;
    if (left < right) return -1;
    return 1;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      if (right[i] === undefined) return 1;
      const c = compare(left[i], right[i]);
      if (c === -1) return -1;
      if (c === 1) return 1;
    }

    if (left.length === right.length) return 0;
    if (left.length < right.length) return -1;
    if (left.length > right.length) return 1;
  }

  if (Array.isArray(left) && Number.isInteger(right)) {
    return compare(left, [right]);
  }

  if (Number.isInteger(left) && Array.isArray(right)) {
    return compare([left], right);
  }
};

lines.forEach((line, index) => {
  if (line.startsWith("#")) return;
  if (line === "" || lines[index + 1] === "") return;

  let left = lines[index];
  let right = lines[index + 1];

  if (typeof left === "string") left = JSON.parse(left);
  if (typeof right === "string") right = JSON.parse(right);

  count++;

  const result = compare(left, right);
  if (result === -1) ordered.push(count);
});

console.log(
  "Part 1.",
  ordered.reduce((a, b) => a + b, 0)
);
