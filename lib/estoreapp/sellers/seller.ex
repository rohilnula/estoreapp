defmodule Estoreapp.Sellers.Seller do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sellers" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(seller, attrs) do
    seller
    |> cast(attrs, [:email, :name, :password_hash])
    |> validate_required([:email, :name, :password_hash])
    |> validate_length(:password_hash, min: 8) # too short
    |> hash_password()
  end

  def hash_password(cset) do
    pw = get_change(cset, :password_hash)
    if pw do
      change(cset, Argon2.add_hash(pw))
    else
      cset
    end
  end
end
