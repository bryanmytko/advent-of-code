# frozen_string_literal: true

require "rspec"
require_relative "../3"

RSpec.describe "Day 3: Lobby" do
  it "generates the largest 2 digit joltage possible" do
    bank1 = "987654321111111"
    bank2 = "811111111111119"
    bank3 = "234234234234278"
    bank4 = "818181911112111"
    bank5 = "4325282447422434333445212333343451413231333423353426332541123254243232342322553322244341312543932333"

    expect(largest_joltage(bank1, 2)).to eq(98)
    expect(largest_joltage(bank2, 2)).to eq(89)
    expect(largest_joltage(bank3, 2)).to eq(78)
    expect(largest_joltage(bank4, 2)).to eq(92)
    expect(largest_joltage(bank5, 2)).to eq(93)
  end

  it "generates the largest 12 digit joltage possible" do
    bank1 = "987654321111111"
    bank2 = "811111111111119"
    bank3 = "234234234234278"
    bank4 = "818181911112111"

    expect(largest_joltage(bank1, 12)).to eq(987654321111)
    expect(largest_joltage(bank2, 12)).to eq(811111111119)
    expect(largest_joltage(bank3, 12)).to eq(434234234278)
    expect(largest_joltage(bank4, 12)).to eq(888911112111)
  end
end
