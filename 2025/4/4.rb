# frozen_string_literal: true

require "rspec"

rows = File.open(File.join(__dir__, 'input.txt')).readlines.map(&:chomp)

def slot_empty?(item)
  item == "."
end

def scan_rolls(rows, replace = false)
  result = 0
  new_rows = Array.new(rows.count) { Array.new(rows[0].size, ".")}

  rows.each.with_index do |row, index|
    row.split("").each.with_index do |slot, i|
      next if slot_empty?(slot)

      not_first_row = index > 0
      not_last_row = index < rows.length - 1 
      not_first_col = i > 0
      not_last_col = i < (row.length - 1)

      left = not_first_col && rows[index][i - 1]
      right = not_last_col && rows[index][i + 1]

      above = not_first_row && rows[index - 1][i]
      al = not_first_row && not_first_col && i > 0 && rows[index - 1][i - 1]
      ar = not_first_row && not_last_col && rows[index - 1][i + 1]

      below = not_last_row && rows[index + 1][i]
      bl = not_last_row && not_first_col && rows[index + 1][i - 1]
      br = not_last_row && not_last_col && rows[index + 1][i + 1]

      count = [
        left, right, above, below,
        al, ar, bl, br
      ].select { |v| v == "@" }.count

      if(replace)
        new_rows[index][i] = (count < 4) ? "x" : slot
      end

      # p "slot: #{slot} at #{index} : #{i} | count: #{count}"
      result += 1 if count < 4
    end
  end

  return { rows: new_rows.map(&:join), count: result } if replace 

  result
end

def scan_and_replace(rows)
  copy_rows = rows
  count = 0

  while(true) do
    result = scan_rolls(copy_rows, true)

    break if count == result[:count]

    count = result[:count]
    copy_rows = result[:rows]
  end

  count
end

p "Part I. #{scan_rolls(rows)}"
p "Part II. #{scan_and_replace(rows)}"
