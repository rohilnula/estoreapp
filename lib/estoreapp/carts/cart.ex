defmodule Estoreapp.Carts.Cart do
  use Ecto.Schema
  import Ecto.Changeset

  schema "carts" do
    field :product_id, :integer
    field :quantity, :integer
    field :user, :string

    timestamps()
  end

  @doc false
  def changeset(cart, attrs) do
    cart
    |> cast(attrs, [:user, :quantity, :product_id])
    |> validate_required([:user, :quantity, :product_id])
  end
end
