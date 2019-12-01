defmodule EstoreappWeb.CartView do
  use EstoreappWeb, :view
  alias EstoreappWeb.CartView

  def render("index.json", %{carts: carts}) do
    %{data: render_many(carts, CartView, "cart.json")}
  end

  def render("show.json", %{cart: cart}) do
    %{data: render_one(cart, CartView, "cart.json")}
  end

  def render("cart.json", %{cart: cart}) do
    %{id: cart.id,
      user: cart.user,
      quantity: cart.quantity,
      product_id: cart.product_id}
  end
end
