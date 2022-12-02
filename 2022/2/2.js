const fs = require("fs");
const file = "./input.txt";
// const file = "./testInput.txt";

// My answers:
// Pt 1. 13484
// Pt 2. 13433

const input = fs.readFileSync(file, "utf-8");
let score = 0;

const moves = new Map();

moves.set("A", 0);
moves.set("B", 1);
moves.set("C", 2);

moves.set("X", 0);
moves.set("Y", 1);
moves.set("Z", 2);

const permute = (val, shift, len) => {
  return Math.abs(val + shift) % len;
};

const playGame = (a, b) => {
  score += b + 1; // default points for the pick

  if (a === b) return (score += 3); // tie
  if (permute(a + 1, 0, 3) == b) return (score += 6); // win
};

const playSecretGame = (a, b) => {
  /* Proxy our move through the secret algorithm:
   * If we want a loss, shift their move by 2
   * If we want a tie, set a = b
   * If we want a win, shift their move by 1
   */
  switch (b) {
    case 0: // lose
      playGame(a, permute(a, 2, 3));
      break;
    case 1: // tie
      playGame(a, permute(a, 0, 3));
      break;
    case 2: // win
      playGame(a, permute(a, 1, 3));
      break;
  }
};

input.split(/\r?\n/).forEach((line) => {
  if (line === "") return;

  const input = line.split(" ");
  const play1 = moves.get(input[0]);
  const play2 = moves.get(input[1]);

  // Part 1 => playGame(play1, play2);
  // Part 2 => playSecretGame(play1, play2);
});

console.log(score);
