# frozen_string_literal: true

require "rspec"
require_relative "../4"

RSpec.describe "Day 4: Printing Department" do
rows = File.open(File.join(__dir__, 'input_test.txt')).readlines.map(&:chomp)

  it "determines how many rolls can be accessed by a forklift" do
    result = scan_rolls(rows)
    expect(result).to eq(13)
  end

  it "determines how many rolls can be accessed by a forklift with replacements" do
    result = scan_and_replace(rows)
    expect(result).to eq(43)
  end
end
