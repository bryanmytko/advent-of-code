const fs = require("fs");
// const file = "./input.txt";
const file = "./testInput.txt";
const input = fs.readFileSync(file, "utf-8");
const lines = input.split("\n");
const monkeys = [];

let allDivisors = 1;

/* Generate initial monkey conditions */
lines.forEach((line, index) => {
  if (line.startsWith("Monkey")) {
    allDivisors *= parseInt(lines[index + 3].match(/(\d+)/)[1]);

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
        const truthy = parseInt(lines[index + 4].match(/(\d+)/)[1]);
        const falsey = parseInt(lines[index + 5].match(/(\d+)/)[1]);
        const div = parseInt(lines[index + 3].match(/(\d+)/)[1]);

        return n % div === 0 ? truthy : falsey;
      },
    });
  }
});

const monkeyGame = (rounds, ridiculous = false) => {
  const counted = Array(monkeys.length).fill(0);

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey, index) => {
      monkey.items.forEach((item) => {
        item = monkey.operation(item);

        if (!ridiculous) item = Math.floor(item / 3);

        item %= allDivisors;
        monkeys[monkey.test(item)].items.push(item);
        counted[index]++;
      });
      monkey.items.length = 0;
    });
  }

  // console.log(counted.sort((a, b) => b - a));

  return counted
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
};

// Only run one or the other
// console.log("Part 1.", monkeyGame(20));
console.log("Part 2.", monkeyGame(10000, true));
