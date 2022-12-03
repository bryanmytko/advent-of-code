const fs = require("fs");
// const file = "./testInput.txt";
const file = "./input.txt";

// My answers:
// Pt 1. 8185
// Pt 2. 2817

const input = fs.readFileSync(file, "utf-8");
let sum = 0;

const getValue = (letter) => {
  const start = "a".charCodeAt();

  if (letter.toLowerCase() === letter) {
    return letter.charCodeAt() - start + 1;
  }

  return letter.charCodeAt() - start + 59;
};

// Part 1.
// input.split(/\r?\n/).forEach((line) => {
//   if (line === "") return;
//   const compA = line.slice(0, line.length / 2).split("");
//   const compB = line.slice(line.length / 2, line.length).split("");
//
//   const common = compA.filter((letter) => compB.includes(letter))[0];
//   sum += getValue(common);
// });

// Part 2.
const lines = input.split(/\r?\n/);

for (i = 0; i < lines.length - 1; i += 3) {
  arr1 = lines[i].split("");
  arr2 = lines[i + 1].split("");
  arr3 = lines[i + 2].split("");

  const commonish = arr1.filter((x) => arr2.includes(x));
  const common = commonish.filter((x) => arr3.includes(x));
  sum += getValue(common[0]);
}

console.log(sum);
