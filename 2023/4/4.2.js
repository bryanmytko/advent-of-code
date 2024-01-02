const fs = require("fs");
const file = "./input.txt";
const input = fs
  .readFileSync(file, "utf-8")
  .split(/\r?\n/)
  .filter((s) => s !== "");

const dummyInput = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

const memoCards = {};
let count = 0;

const howManyMatches = (cardId, card) => {
  console.log(memoCards);
  console.log(cardId, card);

  count++;

  /* Need to memoize results and use that if found */
  // if (memoCards[cardId.toString()])
  //   return console.log("memoized", memoCards[cardId]);

  const winningNums = card
    .match(/\:\s+([0-9].*?)\|/)[1]
    .split(/\s+/)
    .slice(0, -1);
  const myNums = card.match(/\|\s+([0-9].*)/)[1].split(/\s+/);
  const matches = myNums.filter((n) => winningNums.includes(n));

  const nextCards = new Array(matches.length)
    .fill(0)
    .map((_, i) => i + parseInt(cardId) + 1);

  if (nextCards.length) {
    // memoCards[cardId] = nextCards;
    nextCards.forEach((card) => howManyMatches(card, input[card - 1]));
  }
};

input.map((card) => {
  const cardId = card.match(/Card\s+(\d)/)[1];
  howManyMatches(cardId, card);
});

console.log("Part II:", count);
