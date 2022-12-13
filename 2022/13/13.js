const fs = require("fs");
const file = "./testInput.txt";
// const file = "./input.txt";

const lines = fs.readFileSync(file, "utf-8").split(/\n/);
const ordered = [];
let count = 0;

const checkOrder = (left, right) => {
  let ordered = true;

  if (typeof left === "string") left = JSON.parse(left);
  if (typeof right === "string") right = JSON.parse(right);

  /* If they are both lists of numbers*/
  if (Number.isInteger(left[0]) && Number.isInteger(right[0])) {
    for (let i = 0; i < left.length; i++) {
      console.log("Comparing", left[i], "vs.", right[i]);
      if (left[i] > right[i] || !right[i]) {
        return (ordered = false);
      }
    }
    console.log(`This pair is ${ordered ? "ordered" : "not ordered"}`);
    return ordered;
  }

  if (Number.isInteger(left[0]) && Array.isArray(right[0])) {
    ordered = checkOrder([left], right);
    console.log(`This pair is ${ordered ? "ordered" : "not ordered"}`);
    return ordered;
  }

  if (Array.isArray(left[0]) && Number.isInteger(right[0])) {
    ordered = checkOrder(left, [right]);
    console.log(`This pair is ${ordered ? "ordered" : "not ordered"}`);
    return ordered;
  }

  if (Array.isArray(left[0]) && Array.isArray(right[0])) {
    ordered = checkOrder(left[0], right[0]);
    console.log(`This pair is ${ordered ? "ordered" : "not ordered"}`);
    return ordered;
  }
};

lines.forEach((line, index) => {
  if (line === "" || lines[index + 1] === "") return;
  const left = lines[index];
  const right = lines[index + 1];
  count++;

  if (checkOrder(left, right)) ordered.push(count);

  console.log("======================");
});

/* TODO it's missing case 6 */
console.log(ordered);

console.log(
  "Part 1.",
  ordered.reduce((a, b) => a + b, 0)
);
