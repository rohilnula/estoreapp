# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Estoreapp.Repo.insert!(%Estoreapp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Estoreapp.Repo
alias Estoreapp.Sellers.Seller
alias Estoreapp.Buyers.Buyer

pass = Argon2.hash_pwd_salt("1234")

Repo.insert!(%Seller{name: "Alice", email: "alice@seller.com", password_hash: pass})
Repo.insert!(%Seller{name: "Bobby", email: "bobby@seller.com", password_hash: pass})
Repo.insert!(%Seller{name: "Cammy", email: "cammy@seller.com", password_hash: pass})
Repo.insert!(%Seller{name: "Tanny", email: "tanny@seller.com", password_hash: pass})

Repo.insert!(%Buyer{name: "AliceW", email: "alice@buyer.com", password_hash: pass, money: 0.0})
Repo.insert!(%Buyer{name: "BobbyW", email: "bobby@buyer.com", password_hash: pass, money: 0.0})
Repo.insert!(%Buyer{name: "CammyW", email: "cammy@buyer.com", password_hash: pass, money: 0.0})
Repo.insert!(%Buyer{name: "TannyW", email: "tanny@buyer.com", password_hash: pass, money: 0.0})
