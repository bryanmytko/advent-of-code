#!/usr/bin/env ruby

require "open-uri"

if ARGV.length
  day = ARGV[0]
  Dir.mkdir(day) unless File.exists?(day)
  File.new("#{day}/#{day}.js", "w")
  File.new("#{day}/testInput.txt", "w")

  File.open("#{day}/input.txt", "wb") do |file|
    url = "https://adventofcode.com/2022/day/#{day}/input"
    puts url
    file << URI.open(url)
  end
end
