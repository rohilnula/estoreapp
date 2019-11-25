use Mix.Config

# Configure your database
config :estoreapp, Estoreapp.Repo,
  username: "estore",
  password: "estore",
  database: "estoreapp_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :estoreapp, EstoreappWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
