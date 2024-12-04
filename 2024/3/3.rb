# frozen_string_literal: true

file = File.open('./input.txt').readlines.map(&:chomp)
# file = File.open('./testInput.txt').readlines.map(&:chomp)
# file = File.open('./testInput2.txt').readlines.map(&:chomp)

r = /(mul\(\d{1,3},\d{1,3}\))/
ans = 0

def mult(str)
  split = str.split(',')
  n = split.map { |s| s.scan(/\d+/).first }
  n.map(&:to_i).inject(&:*)
end

file.each do |line|
  m = line.scan(r)
  m.each { |x| ans += mult(x[0]) }
end

p "Part I. #{ans}"

# Part II.

r2 = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/
ans2 = 0
enabled = true

file.each do |line|
  m = line.scan(r2).map(&:compact).flatten
  m.each do |instruction|
    # this doesn't seem to simply work as a toggle
    # i.e., can see multiple do/don't in a row, so need to be explicit
    enabled = false if instruction == "don't()"
    enabled = true if instruction == 'do()'

    ans2 += mult(instruction) if enabled
  end
end

p "Part II. #{ans2}"
