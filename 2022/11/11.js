const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";
const input = fs.readFileSync(file, "utf-8");
const lines = input.split("\n");

const rounds = 1;
const monkeys = [];

/* Generate initial monkey conditions */
lines.forEach((line, index) => {
  if (line.startsWith("Monkey")) {
    monkeys.push({
      items: lines[index + 1]
        .split(":")[1]
        .split(",")
        .map((n) => parseInt(n)),
      operation: (n) => {
        const data = lines[index + 2].split("=")[1].split(" ");
        const l = parseInt(data[1]) ? parseInt(data[1]) : n;
        const r = parseInt(data[3]) ? parseInt(data[3]) : n;
        return eval(`${l}${data[2]}${r}`);
      },
      test: (n) => {
        const div = parseInt(lines[index + 3].match(/(\d+)/)[1]);
        const truthy = parseInt(lines[index + 4].match(/(\d+)/)[1]);
        const falsey = parseInt(lines[index + 5].match(/(\d+)/)[1]);
        return n % div === 0 ? truthy : falsey;
      },
    });
  }
});

for (let i = 0; i < rounds; i++) {
  monkeys.forEach((monkey) => {
    console.log(monkey);
  });
}
