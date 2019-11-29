defmodule EstoreappWeb.SellerView do
  use EstoreappWeb, :view
  alias EstoreappWeb.SellerView

  def render("index.json", %{sellers: sellers}) do
    %{data: render_many(sellers, SellerView, "seller.json")}
  end

  def render("show.json", %{seller: seller}) do
    %{data: render_one(seller, SellerView, "seller.json")}
  end

  def render("seller.json", %{seller: seller}) do
    %{id: seller.id,
      email: seller.email,
      name: seller.name,
      password_hash: seller.password_hash,
      money: seller.money}
  end
end
