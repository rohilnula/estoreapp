defmodule EstoreappWeb.SessionController do
  use EstoreappWeb, :controller

  action_fallback EstoreappWeb.FallbackController

  alias Estoreapp.Sellers
  alias Estoreapp.Buyers

  def create(conn, %{"email" => email, "password" => password, "category" => category, "fullName" => fullName, "newLogin" => newLogin}) do
    if category == "Sellers" do
      IO.inspect('Sellerssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
      if newLogin == true do
        Sellers.create_seller(%{"email" => email, "password" => password, "name" => fullName})
      end

      user = Sellers.authenticate_user(email, password)
      if user do
        token = Phoenix.Token.sign(conn, "session", user.id)
        resp = %{token: token, user_id: user.id, user_name: user.name, type: "seller"}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      else
        resp = %{errors: ["Authentication Failed"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unauthorized, Jason.encode!(resp))
      end  
    else
      IO.inspect('Buyerssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
      if newLogin == true do
        # IO.inspect(%{"email" => email, "password_hash" => password, "name" => fullName})
        Buyers.create_buyer(%{"email" => email, "password_hash" => password, "name" => fullName})
      end

      user = Buyers.authenticate_user(email, password)
      if user do
        token = Phoenix.Token.sign(conn, "session", user.id)
        resp = %{token: token, user_id: user.id, user_name: user.name, type: "buyer"}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      else
        resp = %{errors: ["Authentication Failed"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unauthorized, Jason.encode!(resp))
      end  
    end
    
  end
end