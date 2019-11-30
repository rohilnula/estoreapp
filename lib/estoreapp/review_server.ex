defmodule Estoreapp.GameServer do
    use GenServer
  
    def reg(productId) do
      {:via, Registry, {Estoreapp.GameReg, productId}}
    end
  
    def start(productId) do
      spec = %{
        id: __MODULE__,
        start: {__MODULE__, :start_link, [productId]},
        restart: :permanent,
        type: :worker
      }
      Estoreapp.GameSup.start_child(spec)
    end
  
    def start_link(productId) do
      userReview = Estoreapp.BackupAgent.get(productId) || Estoreapp.UserReview.new()
      GenServer.start_link(__MODULE__, userReview, name: reg(productId))
    end
  
    def peek(productId) do
      GenServer.call(reg(productId), {:peek, productId})
    end

    def put(productId, userReview) do
      GenServer.call(reg(productId), {:put, productId, userReview})
    end

    def new(productId, userReview) do
      GenServer.call(reg(productId), {:new, productId})
    end
  
    # Implementation
  
    def init(userReview) do
      {:ok, userReview}
    end
  
    def handle_call({:peek, productId}, _from, userReview) do
      userReview = Estoreapp.BackupAgent.get(productId) || Estoreapp.UserReview.new()
      {:reply, userReview, userReview}
    end

    def handle_call({:put, productId, userReview}, _from, review) do
      Estoreapp.BackupAgent.put(productId, userReview)
      {:reply, review, review}
    end

    def handle_call({:new, productId}, _from, userReview) do
      userReview = Estoreapp.UserReview.new()
      Estoreapp.BackupAgent.put(productId, userReview)
      {:reply, userReview, userReview}
    end
  end