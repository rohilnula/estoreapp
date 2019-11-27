defmodule Estoreapp.Buyers.Buyer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "buyers" do
    field :email, :string
    field :money, :float, default: 0
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(buyer, attrs) do
    buyer
    |> cast(attrs, [:email, :name, :password_hash, :money])
    |> validate_required([:email, :name, :password_hash, :money])
  end
end
