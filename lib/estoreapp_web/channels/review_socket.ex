defmodule EstoreappWeb.ReviewChannel do
    use EstoreappWeb, :channel
  
    alias Estoreapp.UserReview
    alias Estoreapp.BackupAgent

    def join("userReview:" <> productId, payload, socket) do
        if authorized?(payload) do
            Estoreapp.GameServer.start(to_string(productId))
            userReview = Estoreapp.GameServer.peek(to_string(productId))
            socket = socket
            |> assign(:userReview, userReview)
            |> assign(:productId, productId)
            Estoreapp.GameServer.put(to_string(productId), userReview)
            {:ok, %{"join" => productId, "userReview" => userReview}, socket}
        else
            {:error, %{reason: "unauthorized"}}
        end
    end

    def handle_in("addedReview", %{"productId" => productId}, socket) do
        # productId = socket.assigns[:productId]
        userReview = Estoreapp.GameServer.peek(to_string(productId))
        broadcast! socket, to_string(productId), %{ "userReview" => userReview}
        {:noreply, socket}
    end

    defp authorized?(_payload) do
        true
    end
end