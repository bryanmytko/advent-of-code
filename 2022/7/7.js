const fs = require("fs");
const file = "./testInput.txt";

const input = fs.readFileSync(file, "utf-8");
const lines = input.split(/\r?\n/);
const runCommand = (line) => {
  let dir;

  if (line.startsWith("$ cd")) {
    dir = line.split(" ")[2];
    console.log("changing to ", dir);
  }
};

const dirs = {
  "/": { value: 0, sub: [], parent: null },
};

let curr_dir = "/";

lines.forEach((line, index) => {
  if (line === "") return false;

  if (line.startsWith("$ cd")) {
    console.log("dasdf", line.split(" "));
    curr_dir = line.split(" ")[2];
    if (!Object.keys(dirs).includes(curr_dir))
      dirs[curr_dir] = { value: 0, sub: [] };
  }

  /* ls command */
  if (line.startsWith("$ ls")) {
    let size = 0;
    /* read each listed file */
    for (let i = index + 1; i < lines.length; i++) {
      console.log("Reading: ", lines[i]);
      const num = lines[i].match(/(\d+)+/gi);

      /* Does it start with a num? if so, add value */
      if (num) {
        size += parseInt(num[0]);
        // console.log("FOUND A NUM: ", num[0]);
        // console.log("size: ", size);
      }

      /* If it's a new command we stop */
      if (lines[i].startsWith("$")) {
        end = true;
        break;
      }

      /* If line is a dir, add that to count up later */
      if (lines[i].startsWith("dir")) {
        const dir = lines[i].split(" ")[1];

        /* If we've already encountered this dir */
        if (Object.keys(dirs).includes(dir)) {
          size += dirs[dir].value;
          dirs[curr_dir].sub.push(dir);
          dirs[curr_dir].parent = dir;
        } else {
          /* If it's new! */
          dirs[dir] = { value: 0, sub: [], parent: curr_dir };
        }
      }
    }
    console.log("final size that i should add:", size);
    console.log("adding that to", dirs[curr_dir]);
    console.log("curr dir:", curr_dir);
    dirs[curr_dir].value += size;
    console.log("=============");
  }
});

console.log(dirs);
