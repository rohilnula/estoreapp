defmodule EstoreappWeb.SessionController do
  use EstoreappWeb, :controller

  action_fallback EstoreappWeb.FallbackController

  alias Estoreapp.Sellers
  alias Estoreapp.Buyers

  def create(conn, %{"email" => email, "password" => password, "category" => category}) do
    if category == "sellers" do
      IO.inspect('Sellerssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
      user = Sellers.authenticate_user(email, password)
      if user do
        token = Phoenix.Token.sign(conn, "session", user.id)
        resp = %{token: token, user_id: user.id, user_name: user.name}
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
      user = Buyers.authenticate_user(email, password)
      if user do
        token = Phoenix.Token.sign(conn, "session", user.id)
        resp = %{token: token, user_id: user.id, user_name: user.name}
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