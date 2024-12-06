# file = File.open("./testInput.txt").readlines.map(&:chomp)
file = File.open('./input.txt').readlines.map(&:chomp)

sum = 0
left_arr = []
right_arr = []

file.each do |line|
  pairs = line.split(' ')
  leftArr.push(pairs[0])
  rightArr.push(pairs[1])
end

l = left_arr.map(&:to_i).sort
r = right_arr.map(&:to_i).sort

l.each_with_index { |num, i| sum += (num - r[i]).abs }

p sum

# Part 2
arr = []

l.each do |num|
  arr.push r.select { |n| n == num }.inject(&:+) || 0
end

p arr
p 'Part 2'
p arr.inject(&:+)
