defmodule Estoreapp.SellersTest do
  use Estoreapp.DataCase

  alias Estoreapp.Sellers

  describe "sellers" do
    alias Estoreapp.Sellers.Seller

    @valid_attrs %{email: "some email", name: "some name", password_hash: "some password_hash"}
    @update_attrs %{email: "some updated email", name: "some updated name", password_hash: "some updated password_hash"}
    @invalid_attrs %{email: nil, name: nil, password_hash: nil}

    def seller_fixture(attrs \\ %{}) do
      {:ok, seller} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Sellers.create_seller()

      seller
    end

    test "list_sellers/0 returns all sellers" do
      seller = seller_fixture()
      assert Sellers.list_sellers() == [seller]
    end

    test "get_seller!/1 returns the seller with given id" do
      seller = seller_fixture()
      assert Sellers.get_seller!(seller.id) == seller
    end

    test "create_seller/1 with valid data creates a seller" do
      assert {:ok, %Seller{} = seller} = Sellers.create_seller(@valid_attrs)
      assert seller.email == "some email"
      assert seller.name == "some name"
      assert seller.password_hash == "some password_hash"
    end

    test "create_seller/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Sellers.create_seller(@invalid_attrs)
    end

    test "update_seller/2 with valid data updates the seller" do
      seller = seller_fixture()
      assert {:ok, %Seller{} = seller} = Sellers.update_seller(seller, @update_attrs)
      assert seller.email == "some updated email"
      assert seller.name == "some updated name"
      assert seller.password_hash == "some updated password_hash"
    end

    test "update_seller/2 with invalid data returns error changeset" do
      seller = seller_fixture()
      assert {:error, %Ecto.Changeset{}} = Sellers.update_seller(seller, @invalid_attrs)
      assert seller == Sellers.get_seller!(seller.id)
    end

    test "delete_seller/1 deletes the seller" do
      seller = seller_fixture()
      assert {:ok, %Seller{}} = Sellers.delete_seller(seller)
      assert_raise Ecto.NoResultsError, fn -> Sellers.get_seller!(seller.id) end
    end

    test "change_seller/1 returns a seller changeset" do
      seller = seller_fixture()
      assert %Ecto.Changeset{} = Sellers.change_seller(seller)
    end
  end
end
