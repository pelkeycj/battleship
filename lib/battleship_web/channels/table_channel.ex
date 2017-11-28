defmodule BattleshipWeb.TableChannel do
  use BattleshipWeb, :channel

  alias Battleship.App
  alias Battleship.App.Table
  alias BattleshipWeb.TableView
  alias Battleship.Presence
  alias Battleship.Account
  alias Battleship.Account.User
  alias BattleshipWeb.UserView

  def join("table:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("table:" <> id, payload, socket) do
    send(self(), :after_join) # track info
    if authorized?(payload) do
      table = App.get_table!(id)
      resp = TableView.render("show.json", %{table: table})
      {:ok, resp, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("create_table", payload, socket) do
    with {:ok, %Table{} = table} <- App.create_table(%{name: payload["tableName"]}) do
      resp = TableView.render("show.json", %{table: table})
      {:reply, {:ok, resp}, socket}
    end
  end

  #TODO this should be in a different channel (user_channel?)
  # but given the timeline it'll stay here for ease of use
  def handle_in("create_user", payload, socket) do
    with {:ok, %User{} = user} <- Account.create_user(%{name: payload["username"]}) do
      resp = UserView.render("show.json", %{user: user})
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


  def handle_info(:after_join, socket) do
    IO.puts("Handling presence")
    {:noreply, socket}
    #TODO: need to create user resource
  end

end


# Users join the lobby channel first. Then can create a table,
# with a table ID as the response (join code). The user then joins the specified
# table channel. Use presence to get list of all connected users?
