defmodule EstoreappWeb.PurchaseController do
  use EstoreappWeb, :controller

  alias Estoreapp.Purchases
  alias Estoreapp.Purchases.Purchase
  alias EstoreappWeb.SellerController
  alias EstoreappWeb.ProductController
  alias EstoreappWeb.BuyerController

  action_fallback EstoreappWeb.FallbackController

  def index(conn, _params) do
    purchases = Purchases.list_purchases()
    render(conn, "index.json", purchases: purchases)
  end

  def create(conn, %{"purchase" => purchase_params, "userId" => userId, "sum" => sum, "userName" => userName}) do
    # purchase_params.sum has to be reduced for purchase_params.userName
    # Loop through purchase_params.data
    # # Reduce product qty by data.qty for the given productname
    # # Credit the seller account by data.price
    # # Add the data to purchase db
    
    buyer = BuyerController.show(conn, %{"id" => userId})
    newBuyer = Map.update(buyer, :money, sum, &(&1 - sum))
    BuyerController.update(conn, %{"id" => purchase_params.userId, "buyer" => newBuyer})

    Enum.each(purchase_params.purchase, fn data -> 
      newProduct = Map.update(data, :remaining, data.qty, &(&1 - data.qty))
      ProductController.update(conn, %{"id" => data.product_id, "product" => newProduct})

      seller = SellerController.show(conn, %{"id" => data.seller_id})
      newSeller = Map.update(seller, :money, data.price, &(&1 + data.price))
      SellerController.update(conn, %{"id" => data.seller_id, "seller" => newSeller})

      Purchases.create_purchase(%{"price" => data.price, "product_name" => data.product_name, "quantity" => data.qty, "user_name" => userName})
    end)

    with {:ok, %Purchase{} = purchase} <- Purchases.list_purchases() do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.purchase_path(conn, :show, purchase))
      |> render("show.json", purchase: purchase)
    end

    # with {:ok, %Purchase{} = purchase} <- Purchases.create_purchase(purchase_params) do
    #   conn
    #   |> put_status(:created)
    #   |> put_resp_header("location", Routes.purchase_path(conn, :show, purchase))
    #   |> render("show.json", purchase: purchase)
    # end
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
