defmodule Battleship.App.Game do
  alias Battleship.App.Board

  # create a new game
  # params: {from_id, from_name, to_id, to_name}
  def new(params) do
    %{
      status: "PLACING",
      player1: Board.new(params["to_id"], params["to_name"]),
      player2: Board.new(params["from_id"], params["from_name"]),
      waiting_on: 2,
      ships_to_place: Board.list_all_ships()
    }

  end

  # returns necessary info for client
  # sanitizes opponent board to known values
  def client_view(game, client_id) do
    view = %{ status: game.status }

    IO.inspect(game.player1.id)
    IO.inspect(client_id)


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
  
  #TODO game logic here
  #new game - make empty boards - clients need to place their ships
  #client view (each client knows their own ships (size, orientation, start?)
    # each client knows what they've hit and missed
  #attack
    # make a guess
      # if hit, continue guessing,
      # if miss stop
  # join game?

end
