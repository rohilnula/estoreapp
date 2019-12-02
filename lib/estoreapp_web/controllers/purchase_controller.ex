defmodule EstoreappWeb.PurchaseController do
  use EstoreappWeb, :controller

  alias Estoreapp.Purchases
  alias Estoreapp.Purchases.Purchase
  alias Estoreapp.Buyers
  alias Estoreapp.Products
  alias Estoreapp.Sellers
  alias Estoreapp.Carts

  action_fallback EstoreappWeb.FallbackController

  def index(conn, _params) do
    purchases = Purchases.list_purchases()
    render(conn, "index.json", purchases: purchases)
  end

  def create(conn, %{"purchase" => purchase_params, "userId" => userId, "sum" => sum, "userName" => userName}) do  
    buyer = Buyers.get_buyer!(userId)  
    money = Map.get(buyer, :money)
    Buyers.update_buyer(buyer, %{"money" => money - sum})

    product = Products.get_product!(purchase_params["product_id"])
    remaining = Map.get(product, :remaining)
    Products.update_product(product, %{"remaining" => remaining - purchase_params["quantity"]})

    seller = Sellers.get_seller!(Map.get(product, :seller_id))
    sellerMoney = Map.get(seller, :money)
    Sellers.update_seller(seller, %{"money" => sellerMoney - Map.get(product, :price)})

    cart = Carts.get_cart!(purchase_params["cart_id"])
    Carts.delete_cart(cart)

    with {:ok, %Purchase{} = purchase} <- Purchases.create_purchase(%{"price" => Map.get(product, :price), "product_name" => Map.get(product, :product_name), "quantity" => purchase_params["quantity"], "user_name" => userName}) do
      conn
    |> put_status(:created)
    |> put_resp_header("location", Routes.purchase_path(conn, :show, purchase))
    |> render("show.json", purchase: purchase)
    end
  end

  def show(conn, %{"id" => id}) do
    purchase = Purchases.get_purchase!(id)
    render(conn, "show.json", purchase: purchase)
  end

  def update(conn, %{"id" => id, "purchase" => purchase_params}) do
    purchase = Purchases.get_purchase!(id)

    with {:ok, %Purchase{} = purchase} <- Purchases.update_purchase(purchase, purchase_params) do
      render(conn, "show.json", purchase: purchase)
    end
  end

  def delete(conn, %{"id" => id}) do
    purchase = Purchases.get_purchase!(id)

    with {:ok, %Purchase{}} <- Purchases.delete_purchase(purchase) do
      send_resp(conn, :no_content, "")
    end
  end
end
