# aoc202204.py

import pathlib
import re
import sys


def parse(puzzle_input: str) -> list[list[int]]:
    """ Parse input """
    pattern = re.compile(r'\d+')
    return [[int(n) for n in re.findall(pattern, line)]
            for line in puzzle_input.splitlines()]


def in_range(min1: int, max1: int, min2: int, max2: int) -> bool:
    """ Check if one range is inside another """
    return any([min1 >= min2 and max1 <= max2, min2 >= min1 and max2 <= max1])


def part1(data: list[list[int]]) -> int:
    """ Solve part 1 """
    contained_pairs: int = 0
    for pair in data:
        if in_range(*pair):
            contained_pairs += 1
    return contained_pairs


def touching(min1: int, max1: int, min2: int, max2: int) -> bool:
    """ Check if part of one range is inside another """
    return not any([min1 > max2, max1 < min2])


def part2(data: list[list[int]]) -> int:
    """ Solve part 2 """
    touching_pairs: int = 0
    for pair in data:
        if touching(*pair):
            touching_pairs += 1
    return touching_pairs


def solve(puzzle_input: str) -> tuple[int, int]:
    """ Solve the puzzle for the given input """
    data = parse(puzzle_input)
    solution1 = part1(data)  # Correct answer was 462 (with my data)
    solution2 = part2(data)  # Correct answer was 835 (with my data)

    return solution1, solution2


if __name__ == "__main__":
    for path in sys.argv[1:]:
        print(f"{path}:")
        puzzle_input = pathlib.Path(path).read_text().strip()
        solutions = solve(puzzle_input)
        print('\n'.join(str(solution) for solution in solutions))
