# frozen_string_literal: true

# file = File.open('./testInput.txt').readlines.map(&:chomp)
file = File.open('./input.txt').readlines.map(&:chomp)

part1 = 0
part2 = 0

# class Array
class Array
  def safe?
    diffs = slice(1, length).zip(self).map { |z| z[0] - z[1] }

    diffs.all? { |d| (-3..-1).include?(d) } || diffs.all? { |d| (1..3).include?(d) }
  end
end

file.each do |line|
  arr = line.split(' ').map(&:to_i)
  part1 += 1 if arr.safe?

  part2 += 1 if arr.each_with_index.any? do |_, i|
    arr.dup.tap { |t| t.delete_at(i) }.safe?
  end
end

p part1
p part2
