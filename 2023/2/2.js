const fs = require("fs");
const file = "./input.txt";
const input = fs
  .readFileSync(file, "utf-8")
  .split(/\r?\n/)
  .filter((s) => s !== "");

const MAX_VALS = {
  red: 12,
  green: 13,
  blue: 14,
};

const possible = [];
const powers = [];

for (i = 0; i < input.length; i++) {
  const reds = input[i].match(/(\d+)\sred/gi).map((n) => parseInt(n));
  const greens = input[i].match(/(\d+)\sgreen/gi).map((n) => parseInt(n));
  const blues = input[i].match(/(\d+)\sblue/gi).map((n) => parseInt(n));

  if (reds.some((n) => n > MAX_VALS.red)) continue;
  if (greens.some((n) => n > MAX_VALS.green)) continue;
  if (blues.some((n) => n > MAX_VALS.blue)) continue;

  const id = input[i].match(/Game\s(\d+)/)[1];
  possible.push(id);
}

for (i = 0; i < input.length; i++) {
  const reds = input[i].match(/(\d+)\sred/gi).map((n) => parseInt(n));
  const greens = input[i].match(/(\d+)\sgreen/gi).map((n) => parseInt(n));
  const blues = input[i].match(/(\d+)\sblue/gi).map((n) => parseInt(n));

  powers.push(Math.max(...reds) * Math.max(...greens) * Math.max(...blues));
}

console.log(
  "Part I.: ",
  possible.map(Number).reduce((p, v) => p + v),
);

console.log(
  "Part II.:",
  powers.reduce((p, v) => p + v),
);
