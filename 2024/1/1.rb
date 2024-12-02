# file = File.open("./testInput.txt").readlines.map(&:chomp)
file = File.open("./input.txt").readlines.map(&:chomp)

leftArr = []
rightArr = []

file.each do |line|
  pairs = line.split(" ")
  leftArr.push(pairs[0])
  rightArr.push(pairs[1])
end

sum = 0

l = leftArr.map(&:to_i).sort
r = rightArr.map(&:to_i).sort

l.each_with_index { |num, i| sum += (num - r[i]).abs }

p sum

# Part 2

part2sum = 0

arr = []

l.each do |num|
  arr.push r.select { |n| n == num }.inject(&:+) || 0
end

p arr
p "Part 2"
p arr.inject(&:+)

