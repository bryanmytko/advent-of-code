example = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"

input = File.open('./input.txt').readlines.first.chomp

class Invalidator
  attr_reader :invalid, :very_invalid

  def initialize
    @invalid = []
    @very_invalid = []
  end

  def scan_range(input)
    range = input.split("-")
    (range[0]..range[1]).each do |i|
      check_invalid(i)
      check_very_invalid(i)
    end

    @invalid.map(&:to_i)#.sum
  end

  def check_invalid(n)
    len = n.length
    return unless len.even?

    @invalid.push(n.to_i) if n[0, len/2] == n[len/2, len/2]
  end

  def check_very_invalid(n)
    @very_invalid.push(n.to_i) if n.match(/^(.+)\1+$/)
  end
end

z = Invalidator.new

input.split(",").each do |line|
  z.scan_range(line)
end

p "Part I: #{z.invalid.sum}"
p "Part II: #{z.very_invalid.sum}"
