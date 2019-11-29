defmodule EstoreappWeb.ProductView do
  use EstoreappWeb, :view
  alias EstoreappWeb.ProductView

  def render("index.json", %{products: products}) do
    %{data: render_many(products, ProductView, "product.json")}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{id: product.id,
      product_id: product.product_id,
      category_name: product.category_name,
      product_name: product.product_name,
      price: product.price,
      ratings: product.ratings,
      description: product.description,
      discount: product.discount,
      remaining: product.remaining,
      photo: product.photo,
      seller_id: product.seller_id}
  end
end
