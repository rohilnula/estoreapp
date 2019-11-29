defmodule Estoreapp.Repo.Migrations.CreateSellers do
  use Ecto.Migration

  def change do
    create table(:sellers) do
      add :email, :string
      add :name, :string
      add :password_hash, :string
      add :money, :float

      timestamps()
    end

  end
end
