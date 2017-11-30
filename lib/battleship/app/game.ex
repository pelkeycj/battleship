defmodule Battleship.App.Game do
  alias Battleship.App.Board

  # create a new game
  # params: {from_id, from_name, to_id, to_name}
  def new(game_id, params) do
    %{
      game_id: game_id,
      status: "PLACING",
      player1: Board.new(params["to_id"], params["to_name"]),
      player2: Board.new(params["from_id"], params["from_name"]),
      waiting_on: 2,
    }

  end

  # returns necessary info for client
  # sanitizes opponent board to known values
  def client_view(game, client_id) do
    view = %{ status: game.status, game_id: game.game_id }

    # ensure strings
    if game.player1.id == client_id do
      view
      |> Map.put(:player, game.player1)
      |> Map.put(:opponent, Board.sanitize(game.player2))
    else
      view
      |> Map.put(:player, game.player2)
      |> Map.put(:opponent, Board.sanitize(game.player1))
    end
  end

  #TODO fill in place_ship(:vertical)
  #TODO ensure it all works
  #TODO update game state
  def place_ship(game, %{"id" => id, "ship" => ship}) do
    # match id to player in game
    # in board, place ship, remove from ships_to_place
    if game.player1.id == id do
      if Board.can_place?(game.player1.grid, ship["size"], ship["orientation"], ship["coords"]) do
        Map.update!(game, :player1, fn board -> Board.place_ship(board, ship) end)
        else
          game
      end
    else
      if Board.can_place?(game.player2.grid, ship["size"], ship["orientation"], ship["coords"]) do
        Map.update!(game, :player2, fn board -> Board.place_ship(board, ship) end)
        #TODO handle waiting_on and status
      else
        game
      end
    end
  end

end
