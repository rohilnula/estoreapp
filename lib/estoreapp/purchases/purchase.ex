defmodule Estoreapp.Purchases.Purchase do
  use Ecto.Schema
  import Ecto.Changeset

  schema "purchases" do
    field :price, :float
    field :product_name, :string
    field :quantity, :integer
    field :user_name, :string

    timestamps()
  end

  @doc false
  def changeset(purchase, attrs) do
    purchase
    |> cast(attrs, [:user_name, :product_name, :quantity, :price])
    |> validate_required([:user_name, :product_name, :quantity, :price])
  end
end
