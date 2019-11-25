defmodule Estoreapp.Repo do
  use Ecto.Repo,
    otp_app: :estoreapp,
    adapter: Ecto.Adapters.Postgres
end
