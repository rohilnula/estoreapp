defmodule EstoreappWeb.CartControllerTest do
  use EstoreappWeb.ConnCase

  alias Estoreapp.Carts

  @create_attrs %{product_id: 42, quantity: 42, user: "some user"}
  @update_attrs %{product_id: 43, quantity: 43, user: "some updated user"}
  @invalid_attrs %{product_id: nil, quantity: nil, user: nil}

  def fixture(:cart) do
    {:ok, cart} = Carts.create_cart(@create_attrs)
    cart
  end

  describe "index" do
    test "lists all carts", %{conn: conn} do
      conn = get(conn, Routes.cart_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Carts"
    end
  end

  describe "new cart" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.cart_path(conn, :new))
      assert html_response(conn, 200) =~ "New Cart"
    end
  end

  describe "create cart" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.cart_path(conn, :create), cart: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.cart_path(conn, :show, id)

      conn = get(conn, Routes.cart_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Cart"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.cart_path(conn, :create), cart: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Cart"
    end
  end

  describe "edit cart" do
    setup [:create_cart]

    test "renders form for editing chosen cart", %{conn: conn, cart: cart} do
      conn = get(conn, Routes.cart_path(conn, :edit, cart))
      assert html_response(conn, 200) =~ "Edit Cart"
    end
  end

  describe "update cart" do
    setup [:create_cart]

    test "redirects when data is valid", %{conn: conn, cart: cart} do
      conn = put(conn, Routes.cart_path(conn, :update, cart), cart: @update_attrs)
      assert redirected_to(conn) == Routes.cart_path(conn, :show, cart)

      conn = get(conn, Routes.cart_path(conn, :show, cart))
      assert html_response(conn, 200) =~ "some updated user"
    end

    test "renders errors when data is invalid", %{conn: conn, cart: cart} do
      conn = put(conn, Routes.cart_path(conn, :update, cart), cart: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Cart"
    end
  end

  describe "delete cart" do
    setup [:create_cart]

    test "deletes chosen cart", %{conn: conn, cart: cart} do
      conn = delete(conn, Routes.cart_path(conn, :delete, cart))
      assert redirected_to(conn) == Routes.cart_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.cart_path(conn, :show, cart))
      end
    end
  end

  defp create_cart(_) do
    cart = fixture(:cart)
    {:ok, cart: cart}
  end
end
