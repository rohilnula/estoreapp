defmodule EstoreappWeb.ProductControllerTest do
  use EstoreappWeb.ConnCase

  alias Estoreapp.Products
  alias Estoreapp.Products.Product

  @create_attrs %{
    category_name: "some category_name",
    description: "some description",
    discount: 120.5,
    photo: "some photo",
    price: 120.5,
    product_id: 42,
    product_name: "some product_name",
    ratings: 120.5,
    remaining: 42,
    seller_id: 42
  }
  @update_attrs %{
    category_name: "some updated category_name",
    description: "some updated description",
    discount: 456.7,
    photo: "some updated photo",
    price: 456.7,
    product_id: 43,
    product_name: "some updated product_name",
    ratings: 456.7,
    remaining: 43,
    seller_id: 43
  }
  @invalid_attrs %{category_name: nil, description: nil, discount: nil, photo: nil, price: nil, product_id: nil, product_name: nil, ratings: nil, remaining: nil, seller_id: nil}

  def fixture(:product) do
    {:ok, product} = Products.create_product(@create_attrs)
    product
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all products", %{conn: conn} do
      conn = get(conn, Routes.product_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create product" do
    test "renders product when data is valid", %{conn: conn} do
      conn = post(conn, Routes.product_path(conn, :create), product: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.product_path(conn, :show, id))

      assert %{
               "id" => id,
               "category_name" => "some category_name",
               "description" => "some description",
               "discount" => 120.5,
               "photo" => "some photo",
               "price" => 120.5,
               "product_id" => 42,
               "product_name" => "some product_name",
               "ratings" => 120.5,
               "remaining" => 42,
               "seller_id" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.product_path(conn, :create), product: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update product" do
    setup [:create_product]

    test "renders product when data is valid", %{conn: conn, product: %Product{id: id} = product} do
      conn = put(conn, Routes.product_path(conn, :update, product), product: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.product_path(conn, :show, id))

      assert %{
               "id" => id,
               "category_name" => "some updated category_name",
               "description" => "some updated description",
               "discount" => 456.7,
               "photo" => "some updated photo",
               "price" => 456.7,
               "product_id" => 43,
               "product_name" => "some updated product_name",
               "ratings" => 456.7,
               "remaining" => 43,
               "seller_id" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, product: product} do
      conn = put(conn, Routes.product_path(conn, :update, product), product: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete product" do
    setup [:create_product]

    test "deletes chosen product", %{conn: conn, product: product} do
      conn = delete(conn, Routes.product_path(conn, :delete, product))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.product_path(conn, :show, product))
      end
    end
  end

  defp create_product(_) do
    product = fixture(:product)
    {:ok, product: product}
  end
end
