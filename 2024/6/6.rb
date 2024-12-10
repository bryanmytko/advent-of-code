# frozen_string_literal: true

file = File.open('./testInput.txt').readlines.map(&:chomp)
# file = File.open('./input.txt').readlines.map(&:chomp)

p file

# class Gallivant
class Gallivant
  DIRECTIONS = %w[up right down left].freeze

  attr_accessor :cur_direction
  attr_reader :pos

  def initialize(map)
    @cur_direction = 0
    @map = map
    @pos = find_initial_position
  end

  def start
    while next_pos_valid?
      move
      c = @map[@pos[0]][@pos[1]]
      p c
      change_dir if c != '.'

    end
  end

  private

  def next_pos_valid?
    case cur_direction
    when 0
      pos[0] - 1 > 0
    when 1
      map[@pos[1] + 1]
    when 2
      @pos[0] + 1 < map.size
    when 3
      pos[1] - 1 > 0
    end
  end

  def change_dir
    @cur_direction = @cur_direction == DIRECTIONS.size - 1 ? 0 : @cur_direction + 1
  end

  def find_initial_position
    @map.each_with_index do |row, index|
      return [index, row.index('^')] if row.index '^'
    end
  end

  def move
    case @cur_direction
    when 0
      @pos = [@pos[0] - 1, @pos[1]]
    when 1
      @pos = [@pos[0], @pos[1] + 1]
    when 2
      @pos = [@pos[0] + 1, @pos[1] + 1]
    when 3
      @pos = [@pos[0], @pos[1] - 1]
    end
  end
end

g = Gallivant.new(file)
g.start
