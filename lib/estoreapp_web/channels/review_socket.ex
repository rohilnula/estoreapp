defmodule EstoreappWeb.GamesChannel do
    use EstoreappWeb, :channel
  
    alias Estoreapp.UserReview
    alias Estoreapp.BackupAgent

    def join("userReview:" <> productId, payload, socket) do
        if authorized?(payload) do
            Estoreapp.GameServer.start(productId)
            userReview = Estoreapp.GameServer.peek(productId)
            socket = socket
            |> assign(:userReview, userReview)
            |> assign(:productId, productId)
            Estoreapp.GameServer.put(productId, userReview)
            {:ok, %{"join" => productId, "userReview" => userReview}, socket}
        else
            {:error, %{reason: "unauthorized"}}
        end
    end

    def handle_in("addedReview", _, socket) do
        productId = socket.assigns[:productId]
        userReview = Estoreapp.GameServer.peek(productId)
        broadcast! socket, productId + "", %{ "userReview" => userReview}
        {:noreply, socket}
    end

    defp authorized?(_payload) do
        true
    end
end