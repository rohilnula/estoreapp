defmodule EstoreappWeb.SellerControllerTest do
  use EstoreappWeb.ConnCase

  alias Estoreapp.Sellers
  alias Estoreapp.Sellers.Seller

  @create_attrs %{
    email: "some email",
    name: "some name",
    password_hash: "some password_hash"
  }
  @update_attrs %{
    email: "some updated email",
    name: "some updated name",
    password_hash: "some updated password_hash"
  }
  @invalid_attrs %{email: nil, name: nil, password_hash: nil}

  def fixture(:seller) do
    {:ok, seller} = Sellers.create_seller(@create_attrs)
    seller
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all sellers", %{conn: conn} do
      conn = get(conn, Routes.seller_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create seller" do
    test "renders seller when data is valid", %{conn: conn} do
      conn = post(conn, Routes.seller_path(conn, :create), seller: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.seller_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some email",
               "name" => "some name",
               "password_hash" => "some password_hash"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.seller_path(conn, :create), seller: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update seller" do
    setup [:create_seller]

    test "renders seller when data is valid", %{conn: conn, seller: %Seller{id: id} = seller} do
      conn = put(conn, Routes.seller_path(conn, :update, seller), seller: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.seller_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some updated email",
               "name" => "some updated name",
               "password_hash" => "some updated password_hash"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, seller: seller} do
      conn = put(conn, Routes.seller_path(conn, :update, seller), seller: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete seller" do
    setup [:create_seller]

    test "deletes chosen seller", %{conn: conn, seller: seller} do
      conn = delete(conn, Routes.seller_path(conn, :delete, seller))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.seller_path(conn, :show, seller))
      end
    end
  end

  defp create_seller(_) do
    seller = fixture(:seller)
    {:ok, seller: seller}
  end
end
