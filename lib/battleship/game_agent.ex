defmodule Battleship.GameAgent do
  use GenServer

  # via Nat Tuck

  def start_link() do
    state0 = %{}
    GenServer.start_link(__MODULE__, state0, name: __MODULE__)
  end

  def get(key) do
    GenServer.call(__MODULE__, {:get, key})
  end

  def put(key, val) do
    GenServer.call(__MODULE__, {:put, key, val})
  end

  ## Process Implementation
  #TODO check this

  def handle_call({:get, key}, _from, state) do
    {:reply, Map.get(state, key), state}
  end

  def handle_call({:put, key, val}, _from, state) do
    {:reply, :ok, Map.put(state, key, val)}
  end

end
