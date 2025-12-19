# frozen_string_literal: true

require "rspec"
require_relative "../5"

RSpec.describe "Day 5: Cafeteria" do
  test_input = File.open(File.join(__dir__, '../test_input.txt')).readlines

  it "determines how many test ingredients are fresh" do
    expect(find_fresh(test_input)).to eq(3)
  end

  it "determines how many actual ingredients are fresh" do
    # redacted
  end

  it "determines total number of test fresh ingredients" do
    expect(find_all_fresh(test_input)).to eq(14)
  end

  it "determines total number of actual fresh ingredients" do
    # redacted
  end
end

