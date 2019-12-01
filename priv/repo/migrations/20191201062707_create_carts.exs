defmodule Estoreapp.Repo.Migrations.CreateCarts do
  use Ecto.Migration

  def change do
    create table(:carts) do
      add :user, :string
      add :quantity, :integer
      add :product_id, :integer

      timestamps()
    end

  end
end
