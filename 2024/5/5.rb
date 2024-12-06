# frozen_string_literal: true

# file = File.open('./testInput.txt').readlines.map(&:chomp)
file = File.open('./input.txt').readlines.map(&:chomp)

rules = file.filter { |line| line.include? '|' }
updates = file.reject { |line| line.include?('|') }.reject(&:empty?)

ans = []
ans2 = []

def check_valid?(list, cur, rules)
  rules.map do |rule|
    next unless rule[0] == cur

    before_index = list.find_index(rule[0])
    after_index = list.find_index(rule[1])

    !after_index || before_index < after_index
  end.none? false
end

def reorder_list(list, rules)
  list.each do
    rules.each do |rule|
      before_index = list.find_index(rule[0])
      after_index = list.find_index(rule[1])

      if before_index && after_index && before_index > after_index
        list[before_index], list[after_index] = list[after_index], list[before_index]
      end
    end
  end

  list
end

updates.each do |update|
  list = update.split(',')
  formatted_rules = rules.map { |r| r.split('|') }

  res = list.each_with_index.map do |_, i|
    cur = list[i]

    check_valid?(list, cur, formatted_rules)
  end

  if res.none? false
    ans.push(list[list.size / 2].to_i)
  else
    list = reorder_list(list, formatted_rules)
    ans2.push(list[list.size / 2].to_i)
  end
end

p ans.inject(&:+)
p ans2.inject(&:+)
