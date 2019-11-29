defmodule Estoreapp.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :user, :string
      add :product_id, :integer
      add :review, :string

      timestamps()
    end

  end
end
