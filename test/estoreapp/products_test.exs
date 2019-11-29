defmodule Estoreapp.ProductsTest do
  use Estoreapp.DataCase

  alias Estoreapp.Products

  describe "products" do
    alias Estoreapp.Products.Product

    @valid_attrs %{category_name: "some category_name", description: "some description", discount: 120.5, photo: "some photo", price: 120.5, product_id: 42, product_name: "some product_name", ratings: 120.5, remaining: 42}
    @update_attrs %{category_name: "some updated category_name", description: "some updated description", discount: 456.7, photo: "some updated photo", price: 456.7, product_id: 43, product_name: "some updated product_name", ratings: 456.7, remaining: 43}
    @invalid_attrs %{category_name: nil, description: nil, discount: nil, photo: nil, price: nil, product_id: nil, product_name: nil, ratings: nil, remaining: nil}

    def product_fixture(attrs \\ %{}) do
      {:ok, product} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Products.create_product()

      product
    end

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Products.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Products.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      assert {:ok, %Product{} = product} = Products.create_product(@valid_attrs)
      assert product.category_name == "some category_name"
      assert product.description == "some description"
      assert product.discount == 120.5
      assert product.photo == "some photo"
      assert product.price == 120.5
      assert product.product_id == 42
      assert product.product_name == "some product_name"
      assert product.ratings == 120.5
      assert product.remaining == 42
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Products.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()
      assert {:ok, %Product{} = product} = Products.update_product(product, @update_attrs)
      assert product.category_name == "some updated category_name"
      assert product.description == "some updated description"
      assert product.discount == 456.7
      assert product.photo == "some updated photo"
      assert product.price == 456.7
      assert product.product_id == 43
      assert product.product_name == "some updated product_name"
      assert product.ratings == 456.7
      assert product.remaining == 43
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Products.update_product(product, @invalid_attrs)
      assert product == Products.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Products.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Products.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Products.change_product(product)
    end
  end

  describe "products" do
    alias Estoreapp.Products.Product

    @valid_attrs %{category_name: "some category_name", description: "some description", discount: 120.5, photo: "some photo", price: 120.5, product_id: 42, product_name: "some product_name", ratings: 120.5, remaining: 42, seller_id: 42}
    @update_attrs %{category_name: "some updated category_name", description: "some updated description", discount: 456.7, photo: "some updated photo", price: 456.7, product_id: 43, product_name: "some updated product_name", ratings: 456.7, remaining: 43, seller_id: 43}
    @invalid_attrs %{category_name: nil, description: nil, discount: nil, photo: nil, price: nil, product_id: nil, product_name: nil, ratings: nil, remaining: nil, seller_id: nil}

    def product_fixture(attrs \\ %{}) do
      {:ok, product} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Products.create_product()

      product
    end

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Products.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Products.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      assert {:ok, %Product{} = product} = Products.create_product(@valid_attrs)
      assert product.category_name == "some category_name"
      assert product.description == "some description"
      assert product.discount == 120.5
      assert product.photo == "some photo"
      assert product.price == 120.5
      assert product.product_id == 42
      assert product.product_name == "some product_name"
      assert product.ratings == 120.5
      assert product.remaining == 42
      assert product.seller_id == 42
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Products.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()
      assert {:ok, %Product{} = product} = Products.update_product(product, @update_attrs)
      assert product.category_name == "some updated category_name"
      assert product.description == "some updated description"
      assert product.discount == 456.7
      assert product.photo == "some updated photo"
      assert product.price == 456.7
      assert product.product_id == 43
      assert product.product_name == "some updated product_name"
      assert product.ratings == 456.7
      assert product.remaining == 43
      assert product.seller_id == 43
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Products.update_product(product, @invalid_attrs)
      assert product == Products.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Products.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Products.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Products.change_product(product)
    end
  end
end
