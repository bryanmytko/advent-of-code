# frozen_string_literal: true

# file = File.open('./testInput2.txt').readlines.map(&:chomp)
file = File.open('./input.txt').readlines.map(&:chomp)

grid = file.map { |f| f.split('') }
count = 0
count2 = 0

# Better solution would be to just pass a valid "inner" subarray to avoid all these boundary restrictions
def look_around(grid, i, j)
  forward = [grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3]].compact.inject(&:+)
  backward = [grid[i][j], grid[i][j - 1], grid[i][j - 2], grid[i][j - 3]].compact.inject(&:+) if j - 3 >= 0

  if i + 3 < grid.length
    down = [grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j]].compact.inject(&:+)
    diag_fd = [grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2],
               grid[i + 3][j + 3]].compact.inject(&:+)
  end

  if i - 3 >= 0
    up = [grid[i][j], grid[i - 1][j], grid[i - 2][j], grid[i - 3][j]].compact.inject(&:+)
    diag_fu = [grid[i][j], grid[i - 1][j + 1], grid[i - 2][j + 2],
               grid[i - 3][j + 3]].compact.inject(&:+)
  end

  if i + 3 < grid.length && j - 3 >= 0
    diag_bd = [grid[i][j], grid[i + 1][j - 1], grid[i + 2][j - 2],
               grid[i + 3][j - 3]].compact.inject(&:+)
  end

  if j - 3 >= 0 && i - 3 >= 0
    diag_bu = [grid[i][j], grid[i - 1][j - 1], grid[i - 2][j - 2],
               grid[i - 3][j - 3]].compact.inject(&:+)
  end

  [forward, backward, up, down, diag_fd, diag_fu, diag_bd, diag_bu].count 'XMAS'
end

def look_for_mas(grid, i, j)
  # Could also clean this up by passing in an "inner" array but this boundary condition is simpler
  return 0 unless i - 1 >= 0 && i + 1 < grid.length && j - 1 >= 0 && grid[j + 1]

  back_slash = grid[i - 1][j - 1] + grid[i + 1][j + 1]
  front_slash = grid[i + 1][j - 1] + grid[i - 1][j + 1]

  %w[MS SM].include?(back_slash) && %w[MS SM].include?(front_slash) ? 1 : 0
end

grid.each_with_index do |row, i|
  row.each_with_index do |_char, j|
    count += look_around(grid, i, j) if grid[i][j] == 'X'
    count2 += look_for_mas(grid, i, j)  if grid[i][j] == 'A'
  end
end

p "Part I. #{count}"
p "Part II. #{count2}"
