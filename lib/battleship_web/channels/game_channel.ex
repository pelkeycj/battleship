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

  def handle_in("place_ship", payload, socket) do
    game_id = payload["game_id"]
    user_id = String.to_integer(payload["id"])

    game = GameAgent.get(game_id)

    with {:ok, game} <- Game.place_ship(game, payload) do
      GameAgent.put(game_id, game)
      broadcast_game_state(socket, game, user_id)
    end

    {:reply, {:ok, %{}}, socket}
  end

  def handle_in("attack", payload, socket) do
    game_id = payload["game_id"]
    user_id = payload["user_id"]

    game = GameAgent.get(game_id)

    case Game.attack(game, payload) do
      {:hit, game} ->
        IO.puts("game")
        IO.inspect(game)
        GameAgent.put(game_id, game)
        push(socket, "new_game_state", Game.client_view(game, user_id))
      {:miss, game} ->
        IO.puts("game")
        IO.inspect(game)
        GameAgent.put(game_id, game)
        if game.waiting_on == 2 do
          broadcast_game_state(socket, game, user_id)
        else
          push(socket, "new_game_status", %{status: "WAITING"})
        end
       _ ->
    end

    {:reply, {:ok, %{}}, socket}
  end

  def broadcast_game_state(socket, game, user_id) do
    case game.status do
      "PLACING" ->
        push(socket, "new_game_state", Game.client_view(game, user_id))

      "ATTACK" ->
        p1 = game.player1.id
        p2 = game.player2 .id
        BattleshipWeb.Endpoint.broadcast("game:" <> Integer.to_string(p1),
          "new_game_state", Game.client_view(game, p1))
        BattleshipWeb.Endpoint.broadcast("game:" <> Integer.to_string(p2),
          "new_game_state", Game.client_view(game, p2))
    end
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
