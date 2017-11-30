defmodule BattleshipWeb.GameChannel do
  use BattleshipWeb, :channel

  alias Battleship.GameAgent
  alias Battleship.App.Game

  # users join a new game where game_id is (from_id:to_id)
  def join("game:" <> game_id, payload, socket) do
    game = GameAgent.get(game_id) || Game.new(payload["params"])
    GameAgent.put(game_id, game)

    {:ok, Game.client_view(game, payload["id"]), socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
