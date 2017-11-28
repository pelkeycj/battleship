defmodule BattleshipWeb.TableChannel do
  use BattleshipWeb, :channel

  alias Battleship.App
  alias Battleship.App.Table

  def join("table:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("table:" <> id, payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # create a table and return its id (join code)
  def handle_in("create_table", payload, socket) do
    with {:ok, %Table{} = table} <- App.create_table(%{name: payload["tableName"]}) do
      resp = BattleshipWeb.TableView.render("show.json", %{table: table})
      {:reply, {:ok, resp}, socket}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (table:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end

end


# Users join the lobby channel first. Then can create a table,
# with a table ID as the response (join code). The user then joins the specified
# table channel. Use presence to get list of all connected users?
