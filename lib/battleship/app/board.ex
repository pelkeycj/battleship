defmodule Battleship.App.Board do

  @unknown "?"
  @water "~"
  @ship "|"
  @water_hit "O"
  @ship_hit "X"

  # create a new board for user of name, id
  # a board is a 10x10 grid, initially blank
  def new(id, name) do
    %{
      id: String.to_integer(id),
      name: name,
      grid: make_water_grid(),
    }
  end

  # lists all ships
  def list_all_ships do
    [5, 4, 3, 3, 2]
  end

  # constructs a 10x10 grid of water
  def make_water_grid do
    List.duplicate(List.duplicate(@water, 10), 10)
  end

  # replaces a boards grid with a sanitized one
  def sanitize(board) do
    Map.update!(board, :grid, &(sanitize_grid(&1)))
  end

  # returns a new grid containing only hits and unknowns
  def sanitize_grid(grid) do
    Enum.map(grid, fn row -> sanitize_row(row) end)
  end

  def sanitize_row(row) do
    Enum.map(row, fn cell -> sanitize_cell(cell) end)
  end

  def sanitize_cell(cell) do
    case cell do
      @water -> @unknown
      @ship -> @unknown
      _ -> cell
    end
  end

end
