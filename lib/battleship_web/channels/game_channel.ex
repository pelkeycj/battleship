defmodule BattleshipWeb.GameChannel do
  use BattleshipWeb, :channel

  alias Battleship.GameAgent
  alias Battleship.App.Game

  # users join a new game
  def join("game:" <> user_id, payload, socket) do
    game_id = payload["game_id"]
    game = GameAgent.get(game_id) || Game.new(game_id, payload["params"])
    GameAgent.put(game_id, game)

    {:ok, Game.client_view(game, String.to_integer(user_id)), socket}
  end

  #TODO place ship on board (if possible)
  #TODO update client state
  def handle_in("place_ship", payload, socket) do
    IO.puts("place_ship")
    IO.inspect(payload)
    {:reply, {:ok, payload}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
