defmodule EstoreappWeb.BuyerControllerTest do
  use EstoreappWeb.ConnCase

  alias Estoreapp.Buyers
  alias Estoreapp.Buyers.Buyer

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

  def fixture(:buyer) do
    {:ok, buyer} = Buyers.create_buyer(@create_attrs)
    buyer
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all buyers", %{conn: conn} do
      conn = get(conn, Routes.buyer_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create buyer" do
    test "renders buyer when data is valid", %{conn: conn} do
      conn = post(conn, Routes.buyer_path(conn, :create), buyer: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.buyer_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some email",
               "name" => "some name",
               "password_hash" => "some password_hash"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.buyer_path(conn, :create), buyer: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update buyer" do
    setup [:create_buyer]

    test "renders buyer when data is valid", %{conn: conn, buyer: %Buyer{id: id} = buyer} do
      conn = put(conn, Routes.buyer_path(conn, :update, buyer), buyer: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.buyer_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some updated email",
               "name" => "some updated name",
               "password_hash" => "some updated password_hash"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, buyer: buyer} do
      conn = put(conn, Routes.buyer_path(conn, :update, buyer), buyer: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete buyer" do
    setup [:create_buyer]

    test "deletes chosen buyer", %{conn: conn, buyer: buyer} do
      conn = delete(conn, Routes.buyer_path(conn, :delete, buyer))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.buyer_path(conn, :show, buyer))
      end
    end
  end

  defp create_buyer(_) do
    buyer = fixture(:buyer)
    {:ok, buyer: buyer}
  end
end
