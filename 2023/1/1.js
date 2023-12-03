const fs = require("fs");
const file = "./input.txt";
const input = fs
  .readFileSync(file, "utf-8")
  .split(/\r?\n/)
  .filter((s) => s !== "");

const data = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const data2 = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

const strNum = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const findNum = (line) => {
  const found = line.match(/one|two|three|four|five|six|seven|eight|nine|\d/g);
  const result = found.map((f) =>
    strNum.indexOf(f) !== -1 ? String(strNum.indexOf(f) + 1) : f,
  );

  console.log(result);
  return result;
};

const recalibrator = (input) =>
  input
    .map(findNum)
    .map((g) =>
      g.length === 1 ? Number(g[0] + g[0]) : Number(g.shift() + g.pop()),
    )
    .reduce((p, v) => p + v);

// console.log("Part I:");
// console.log(calibrator(data));
// console.log(calibrator(input));
console.log("--------------------");
console.log("Part II:");
console.log(recalibrator(data2));
console.log(recalibrator(input));
