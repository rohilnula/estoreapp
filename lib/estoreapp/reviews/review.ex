defmodule Estoreapp.Reviews.Review do
  use Ecto.Schema
  import Ecto.Changeset

  schema "reviews" do
    field :product_id, :integer
    field :review, :string
    field :user, :string

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    review
    |> cast(attrs, [:user, :product_id, :review])
    |> validate_required([:user, :product_id, :review])
  end
end
