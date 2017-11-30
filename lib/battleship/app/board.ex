defmodule Battleship.App.Board do

  @grid_size 10

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
      ships_to_place: list_all_ships(),
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
    |> Map.drop([:ships_to_place])
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


  #This assumes that the ship can be placed (can_place? was called)
  # also strips the first ship from the list of ships to place
  def place_ship(board, %{"size" => size, "orientation" => orient, "coords" => coords}) do
    IO.puts("size")
    IO.inspect(size)
    IO.puts("coords")
    IO.inspect(coords)
    IO.inspect(board)
    case orient do
      "horizontal" -> m = Map.update!(board, :grid,
                        fn grid ->
                          place_ship(:horizontal, grid, size, coords)
                        end)
                     |> Map.update!(:ships_to_place,
                        fn x ->
                          Enum.drop(x, 1)
                        end)
                    IO.inspect(m)
                    m
      "vertical" -> m = Map.update!(board, :grid,
                      fn grid ->
                        place_ship(:vertical, grid, size, coords)
                      end)
                    |> Map.update!(:ships_to_place,
                         fn x ->
                           Enum.drop(x, 1)
                         end)
                    IO.inspect(m)
                    m
    end
  end


  def place_ship(:horizontal, grid, size, coords) do
    ship = List.duplicate(@ship, size)
    first = coords["col"]
    last = coords["col"] + size
    row = Enum.at(grid, coords["row"])

    row_before = Enum.slice(row, 0, first)
    row_after = Enum.slice(row, last..@grid_size - 1)
    result = Enum.concat(row_before, ship)
    |> Enum.concat(row_after)


    List.replace_at(grid, coords["row"], result)
  end

  def place_ship(:vertical, grid, size, coords) do
    first = coords["row"]
    last = coords["row"] + size - 1
    rows = Enum.to_list(first..last) # row indices

    IO.puts("first")
    IO.inspect(first)
    IO.puts("last")
    IO.inspect(last)

    rows_before = Enum.slice(grid, 0, first)
    rows_within = Enum.slice(grid, first..last)
    rows_after = Enum.slice(grid, (last+1)..(@grid_size-1))
    IO.puts("ROWS")
    IO.inspect(rows_before)
    IO.inspect(rows_within)
    IO.inspect(rows_after)
    IO.puts("END ROWS")

    # for each row within, we replace the value at col
    rows_within = Enum.map(rows_within, fn row ->
      List.replace_at(row, coords["col"], @ship)
    end)

    IO.inspect(rows_within)

    result = Enum.concat(rows_before, rows_within)
    |> Enum.concat(rows_after)

    IO.puts("result==")
    IO.inspect(result)

    result
  end


  # can this ship be placed in the grid
  def can_place?(grid, size, orient, coords) do
    case orient do
      "horizontal" ->
        end_location = coords["col"] + size - 1
        coords["col"] >= 0 && end_location < @grid_size
        && clear_path?(:horizontal, grid, size, coords)

      "vertical" ->
        end_location = coords["row"] + size - 1
        coords["row"] >= 0 && end_location < @grid_size
        && clear_path?(:vertical, grid, size, coords)
    end
  end

  # is the path clear of ships horizontally?
  def clear_path?(:horizontal, grid, size, coords) do
    endCol = coords["row"] + size - 1
    Enum.at(grid, coords["row"])
    |> Enum.slice(coords["row"]..endCol)
    |> Enum.all?(fn cell -> cell == @water end)
  end

  # is the path clear of ships vertically?
  def clear_path?(:vertical, grid, size, coords) do
    endRow = coords["col"] + size - 1
    grid
    |> Enum.map(fn row -> Enum.at(row, coords["col"]) end)
    |> Enum.slice(coords["row"]..endRow)
    |> Enum.all?(fn cell -> cell == @water end)
  end

end
