# frozen_string_literal: true

require "rspec"

rows = File.open(File.join(__dir__, 'input.txt')).readlines.map(&:chomp)

# Part 1. but part 2 should solve both
# def largest_joltage(bank)
#   m = { t: 0, o: 0 }
#   a = bank.split("").map(&:to_i)
#
#   a.map.with_index do |n, index|
#     if(n > m[:t] && a[index+1])
#       m[:t] = n
#       m[:o] = 0 if n == m[:t]
#     elsif(n >= m[:o])
#       m[:o] = n
#     end
#   end
#
#   m[:t] * 10 + m[:o]
# end

def largest_joltage(bank, digits)
  nbank = bank.split("").map(&:to_i)
  start = 0
  answer = []

  digits.times do |d|
    largest_digit = 0
    remaining = digits - d - 1

    (start...nbank.length - remaining).each do |n|
      if nbank[n] > largest_digit
        largest_digit = nbank[n] 
        start = n + 1
      end
    end

    answer << largest_digit
  end

  answer.join.to_i
end

joltages = rows.map { |r| largest_joltage(r, 2) }.sum
more_joltages = rows.map { |r| largest_joltage(r, 12) }.sum

p "Part I: #{joltages}"
p "Part II: #{more_joltages}"
