defmodule Estoreapp.Repo.Migrations.CreatePurchases do
  use Ecto.Migration

  def change do
    create table(:purchases) do
      add :user_name, :string
      add :product_name, :string
      add :quantity, :integer
      add :price, :float

      timestamps()
    end

  end
end
