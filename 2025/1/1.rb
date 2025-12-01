combinations = File.open('./input.txt').readlines.map(&:chomp)
# combinations = %w(L68 L30 R48 L5 R60 L55 L1 L99 R14 L82)

current = 50
current2 = 50
zeros_seen = 0

def rotate(combination)
  c = combination.scan(/[A-Z]+|\d+/)
  c[0] == "L" ? -c[1].to_i : c[1].to_i
end

result = combinations.filter do |c|
  val = rotate(c)

  # there's definitely an O(1) solution for this but this works
  val.abs.times do
    val > 0 ? current2 += 1 : current2 -= 1
    zeros_seen += 1 if current2 % 100 == 0
  end

  current += val
  current % 100 == 0
end

p "Part I: #{result.size}"
p "Part II: #{zeros_seen}"
