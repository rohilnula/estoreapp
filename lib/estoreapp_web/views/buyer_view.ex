defmodule EstoreappWeb.BuyerView do
  use EstoreappWeb, :view
  alias EstoreappWeb.BuyerView

  def render("index.json", %{buyers: buyers}) do
    %{data: render_many(buyers, BuyerView, "buyer.json")}
  end

  def render("show.json", %{buyer: buyer}) do
    %{data: render_one(buyer, BuyerView, "buyer.json")}
  end

  def render("buyer.json", %{buyer: buyer}) do
    %{id: buyer.id,
      email: buyer.email,
      name: buyer.name,
      password_hash: buyer.password_hash,
      money: buyer.money}
  end
end
