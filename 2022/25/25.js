const fs = require("fs");
// const file = "./testInput.txt";
const file = "input.txt";

const lines = fs
  .readFileSync(file, "utf-8")
  .split(/\n/)
  .filter((n) => n !== "");

const snafu = [
  [0, 0],
  [1, 1],
  [2, 2],
  ["=", -2],
  ["-", -1],
];

const sum = lines.reduce((prev, line) => {
  return (
    prev +
    line
      .split("")
      .map((d) => {
        if (d === "=") return -2;
        if (d === "-") return -1;
        return parseInt(d);
      })
      .reverse()
      .map((c, i) => {
        const mult = 5 ** i;
        return c * mult;
      })
      .reduce((a, b) => a + b, 0)
  );
}, 0);

const decrypt = (num) => {
  const base5 = num.toString(5);
  let base5ints = base5.split("").map(Number);

  for (let i = 0; i < base5ints.length - 1; i++) {
    if (base5ints[i] > 1) {
      base5ints[i] -= 5;
      i > 0 ? base5ints[i - 1]++ : base5ints.unshift(1);
    }
  }

  return base5ints
    .map((b) => {
      return snafu.find((pair) => pair[1] === b);
    })
    .map((pair) => pair[0])
    .join("");
};

console.log(decrypt(sum));
