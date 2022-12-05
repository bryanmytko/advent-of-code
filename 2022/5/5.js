const fs = require("fs");
// const file = "./testInput.txt";
const file = "./input.txt";

const input = fs.readFileSync(file, "utf-8");
const re = /(\s{3})[\s]|([\[A-Z\]]{3})\s?/gi;
const stacks = [];
const instructions = [];

input.split(/\r?\n/).forEach((line) => {
  /* Skip junk lines */
  if (line === "" || line.startsWith(" 1")) return;

  if (line.startsWith("move")) {
    /* Generate instructions */
    instructions.push(line.match(/(\d+)+/gi).map((n) => parseInt(n)));
  } else {
    /* Generate stacks */
    const match = line.match(re);
    const row = [];
    match.forEach((m) => {
      const fill = m.match(/[A-Z]/gi);
      row.push(fill ? fill[0] : false);
    });
    stacks.push(row);
  }
});

const maxLen = stacks[stacks.length - 1].length;

// Part 1.
// instructions.forEach((instruction, i) => {
//   let [amount, from, to] = instruction;
//
//   for (let i = 0; i < amount; i++) {
//     let movingCrate;
//
//     for (let row = 0; row < stacks.length; row++) {
//       if (stacks[row][from - 1]) {
//         movingCrate = stacks[row][from - 1];
//         stacks[row][from - 1] = false;
//         break;
//       }
//     }
//
//     for (let count = 0; count < stacks.length; count++) {
//       if (!stacks[stacks.length - count - 1][to - 1]) {
//         stacks[stacks.length - count - 1][to - 1] = movingCrate;
//         movingCrate = 0;
//       }
//     }
//
//     if (movingCrate) {
//       const newRow = Array(maxLen).fill(false);
//       newRow[to - 1] = movingCrate;
//       stacks.unshift(newRow);
//     }
//   }
// });

// Part 2.
instructions.forEach((instruction) => {
  let [amount, from, to] = instruction;
  let count = amount - 1;

  for (let i = 0; i < amount; i++) {
    let movingCrate;

    /* From */
    for (let row = 0; row < stacks.length; row++) {
      if (stacks[row][from - 1]) {
        movingCrate = stacks[row + count][from - 1];
        stacks[row + count][from - 1] = false;
        count = count - 1;
        break;
      }
    }

    /* To */
    for (let count = 0; count < stacks.length; count++) {
      if (!stacks[stacks.length - count - 1][to - 1]) {
        stacks[stacks.length - count - 1][to - 1] = movingCrate;
        movingCrate = 0;
      }
    }

    /* Consider no space at top */
    if (movingCrate) {
      const newRow = Array(maxLen).fill(false);
      newRow[to - 1] = movingCrate;
      stacks.unshift(newRow);
    }
  }
});

/* Find answers */
let answers = new Array(maxLen).fill(0);

stacks.forEach((row) => {
  row.forEach((n, i) => {
    if (!answers[i]) answers[i] = n;
  });
});

console.log(answers.join(""));
