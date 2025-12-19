# frozen_string_literal: true

def find_fresh(input)
  split = input.join.split("\n\n")
  ranges = split[0].split("\n")
  ingredients = split[1].split("\n")
  fresh = Set[]

  # first approach was to collect all the numbers in the ranges in a set and then simply check
  # if the ingredients were in there but the input data numbers are ridiculously large and this
  # approch froze my computer

  ingredients.map(&:to_i).each do |i|
    ranges.each do |range|
      r = range.split("-").map(&:to_i)

      if (r[0]..r[1]).include? i
        fresh << i
      end
    end
  end

  fresh.size
end

# the numbers in the example are way too many to just collect and count
# so the basic idea here is to first sort the ranges then try to combine the ones where they overlap
# once we have that we can just sum up the lengths of all the combined ranges

def find_all_fresh(input)
  split = input.join.split("\n\n")
  ranges = split.first.split("\n")

  sorted = ranges.sort { |a,b| a.split("-").first.to_i <=> b.split("-").first.to_i }

  reduced_ranges = sorted.reduce([]) do |prev, curr|
    next prev << curr if prev.empty?

    curr_start = curr.split("-").first.to_i 
    curr_end = curr.split("-").last.to_i
    prev_end = prev.last.split("-").last.to_i

    curr_start > prev_end  ?
      prev << curr :
      prev[-1] = "#{prev.last.split("-").first}-#{[curr_end,prev_end].max}"

    prev
  end

  reduced_ranges.inject(0) { |prev, curr| prev + (curr.split("-").first.to_i..curr.split("-").last.to_i).size}
end

input = File.open(File.join(__dir__, 'input.txt')).readlines

p "Part I: #{find_fresh(input)}"
p "Part II: #{find_all_fresh(input)}"
