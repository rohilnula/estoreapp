defmodule Estoreapp.Buyers.Buyer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "buyers" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(buyer, attrs) do
    buyer
    |> cast(attrs, [:email, :name, :password_hash])
    |> IO.inspect()
    buyer
    |> cast(attrs, [:email, :name, :password_hash])
    |> validate_required([:email, :name, :password_hash])
    |> validate_length(:password_hash, min: 8) # too short
    |> hash_password()
  end

  def hash_password(cset) do
    pw = get_change(cset, :password_hash)
    IO.inspect(pw)
    IO.inspect(cset)
    if pw do
      change(cset, %{"password_hash" => Argon2.add_hash(pw)})
    else
      cset
    end
  end
end
