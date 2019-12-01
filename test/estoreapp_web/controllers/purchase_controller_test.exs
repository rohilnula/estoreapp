defmodule EstoreappWeb.PurchaseControllerTest do
  use EstoreappWeb.ConnCase

  alias Estoreapp.Purchases
  alias Estoreapp.Purchases.Purchase

  @create_attrs %{
    order_id: 42,
    price: 120.5,
    product_name: "some product_name",
    quantity: 42,
    user_name: "some user_name"
  }
  @update_attrs %{
    order_id: 43,
    price: 456.7,
    product_name: "some updated product_name",
    quantity: 43,
    user_name: "some updated user_name"
  }
  @invalid_attrs %{order_id: nil, price: nil, product_name: nil, quantity: nil, user_name: nil}

  def fixture(:purchase) do
    {:ok, purchase} = Purchases.create_purchase(@create_attrs)
    purchase
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all purchases", %{conn: conn} do
      conn = get(conn, Routes.purchase_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create purchase" do
    test "renders purchase when data is valid", %{conn: conn} do
      conn = post(conn, Routes.purchase_path(conn, :create), purchase: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.purchase_path(conn, :show, id))

      assert %{
               "id" => id,
               "order_id" => 42,
               "price" => 120.5,
               "product_name" => "some product_name",
               "quantity" => 42,
               "user_name" => "some user_name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.purchase_path(conn, :create), purchase: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update purchase" do
    setup [:create_purchase]

    test "renders purchase when data is valid", %{conn: conn, purchase: %Purchase{id: id} = purchase} do
      conn = put(conn, Routes.purchase_path(conn, :update, purchase), purchase: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.purchase_path(conn, :show, id))

      assert %{
               "id" => id,
               "order_id" => 43,
               "price" => 456.7,
               "product_name" => "some updated product_name",
               "quantity" => 43,
               "user_name" => "some updated user_name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, purchase: purchase} do
      conn = put(conn, Routes.purchase_path(conn, :update, purchase), purchase: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete purchase" do
    setup [:create_purchase]

    test "deletes chosen purchase", %{conn: conn, purchase: purchase} do
      conn = delete(conn, Routes.purchase_path(conn, :delete, purchase))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.purchase_path(conn, :show, purchase))
      end
    end
  end

  defp create_purchase(_) do
    purchase = fixture(:purchase)
    {:ok, purchase: purchase}
  end
end
