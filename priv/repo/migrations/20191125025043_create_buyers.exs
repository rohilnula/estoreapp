defmodule Estoreapp.Repo.Migrations.CreateBuyers do
  use Ecto.Migration

  def change do
    create table(:buyers) do
      add :email, :string
      add :name, :string
      add :password_hash, :string

      timestamps()
    end

  end
end
