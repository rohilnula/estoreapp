defmodule EstoreappWeb.CartController do
  use EstoreappWeb, :controller

  alias Estoreapp.Carts
  alias Estoreapp.Carts.Cart

  def index(conn, _params) do
    carts = Carts.list_carts()
    render(conn, "index.html", carts: carts)
  end

  def new(conn, _params) do
    changeset = Carts.change_cart(%Cart{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"cart" => cart_params}) do
    case Carts.create_cart(cart_params) do
      {:ok, cart} ->
        conn
        |> put_status(:created)
      	|> put_resp_header("location", Routes.cart_path(conn, :show, cart))
      	|> render("show.json", cart: cart)

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    cart = Carts.get_cart!(id)
    render(conn, "show.html", cart: cart)
  end

  def edit(conn, %{"id" => id}) do
    cart = Carts.get_cart!(id)
    changeset = Carts.change_cart(cart)
    render(conn, "edit.html", cart: cart, changeset: changeset)
  end

  def update(conn, %{"id" => id, "cart" => cart_params}) do
    cart = Carts.get_cart!(id)

    case Carts.update_cart(cart, cart_params) do
      {:ok, cart} ->
        conn
        |> put_flash(:info, "Cart updated successfully.")
        |> redirect(to: Routes.cart_path(conn, :show, cart))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", cart: cart, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    cart = Carts.get_cart!(id)
    {:ok, _cart} = Carts.delete_cart(cart)

    conn
    |> put_flash(:info, "Cart deleted successfully.")
    |> redirect(to: Routes.cart_path(conn, :index))
  end
end
