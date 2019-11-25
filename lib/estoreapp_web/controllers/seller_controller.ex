defmodule EstoreappWeb.SellerController do
  use EstoreappWeb, :controller

  alias Estoreapp.Sellers
  alias Estoreapp.Sellers.Seller

  action_fallback EstoreappWeb.FallbackController

  def index(conn, _params) do
    sellers = Sellers.list_sellers()
    render(conn, "index.json", sellers: sellers)
  end

  def create(conn, %{"seller" => seller_params}) do
    with {:ok, %Seller{} = seller} <- Sellers.create_seller(seller_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.seller_path(conn, :show, seller))
      |> render("show.json", seller: seller)
    end
  end

  def show(conn, %{"id" => id}) do
    seller = Sellers.get_seller!(id)
    render(conn, "show.json", seller: seller)
  end

  def update(conn, %{"id" => id, "seller" => seller_params}) do
    seller = Sellers.get_seller!(id)

    with {:ok, %Seller{} = seller} <- Sellers.update_seller(seller, seller_params) do
      render(conn, "show.json", seller: seller)
    end
  end

  def delete(conn, %{"id" => id}) do
    seller = Sellers.get_seller!(id)

    with {:ok, %Seller{}} <- Sellers.delete_seller(seller) do
      send_resp(conn, :no_content, "")
    end
  end
end
