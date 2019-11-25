defmodule EstoreappWeb.BuyerController do
  use EstoreappWeb, :controller

  alias Estoreapp.Buyers
  alias Estoreapp.Buyers.Buyer

  action_fallback EstoreappWeb.FallbackController

  def index(conn, _params) do
    buyers = Buyers.list_buyers()
    render(conn, "index.json", buyers: buyers)
  end

  def create(conn, %{"buyer" => buyer_params}) do
    with {:ok, %Buyer{} = buyer} <- Buyers.create_buyer(buyer_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.buyer_path(conn, :show, buyer))
      |> render("show.json", buyer: buyer)
    end
  end

  def show(conn, %{"id" => id}) do
    buyer = Buyers.get_buyer!(id)
    render(conn, "show.json", buyer: buyer)
  end

  def update(conn, %{"id" => id, "buyer" => buyer_params}) do
    buyer = Buyers.get_buyer!(id)

    with {:ok, %Buyer{} = buyer} <- Buyers.update_buyer(buyer, buyer_params) do
      render(conn, "show.json", buyer: buyer)
    end
  end

  def delete(conn, %{"id" => id}) do
    buyer = Buyers.get_buyer!(id)

    with {:ok, %Buyer{}} <- Buyers.delete_buyer(buyer) do
      send_resp(conn, :no_content, "")
    end
  end
end
