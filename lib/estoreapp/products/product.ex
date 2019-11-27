defmodule Estoreapp.Products.Product do
  use Ecto.Schema
  import Ecto.Changeset

  schema "products" do
    field :category_name, :string
    field :description, :string
    field :discount, :float
    field :photo, :string
    field :price, :float
    field :product_id, :integer
    field :product_name, :string
    field :ratings, :float
    field :remaining, :integer

    timestamps()
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:product_id, :category_name, :product_name, :price, :ratings, :description, :discount, :remaining, :photo])
    |> validate_required([:product_id, :category_name, :product_name, :price, :ratings, :description, :discount, :remaining, :photo])
  end
end
