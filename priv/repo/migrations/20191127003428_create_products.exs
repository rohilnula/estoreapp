defmodule Estoreapp.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products) do
      add :product_id, :integer
      add :category_name, :string
      add :product_name, :string
      add :price, :float
      add :ratings, :float
      add :description, :string
      add :discount, :float
      add :remaining, :integer
      add :photo, :text

      timestamps()
    end

  end
end
