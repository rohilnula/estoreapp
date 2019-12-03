defmodule Estoreapp.Buyers.Buyer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "buyers" do
    field :email, :string
    field :money, :float, default: 0.0
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(buyer, attrs) do
    buyer
    |> cast(attrs, [:email, :name, :password_hash, :money])
    |> validate_required([:email, :name, :password_hash, :money])
    |> hash_password()
  end

  def hash_password(cset) do
    pw = get_change(cset, :password_hash)
    if pw do
      change(cset, %{:password_hash => Argon2.hash_pwd_salt(pw)})
    else
      cset
    end
  end
end
