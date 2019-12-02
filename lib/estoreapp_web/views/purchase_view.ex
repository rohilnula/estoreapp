defmodule EstoreappWeb.PurchaseView do
  use EstoreappWeb, :view
  alias EstoreappWeb.PurchaseView

  def render("index.json", %{purchases: purchases}) do
    %{data: render_many(purchases, PurchaseView, "purchase.json")}
  end

  def render("show.json", %{purchase: purchase}) do
    %{data: render_one(purchase, PurchaseView, "purchase.json")}
  end

  def render("purchase.json", %{purchase: purchase}) do
    %{id: purchase.id,
      user_name: purchase.user_name,
      product_name: purchase.product_name,
      quantity: purchase.quantity,
      price: purchase.price
      # order_id: purchase.order_id
    }
  end
end
