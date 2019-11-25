defmodule Estoreapp.BuyersTest do
  use Estoreapp.DataCase

  alias Estoreapp.Buyers

  describe "buyers" do
    alias Estoreapp.Buyers.Buyer

    @valid_attrs %{email: "some email", name: "some name", password_hash: "some password_hash"}
    @update_attrs %{email: "some updated email", name: "some updated name", password_hash: "some updated password_hash"}
    @invalid_attrs %{email: nil, name: nil, password_hash: nil}

    def buyer_fixture(attrs \\ %{}) do
      {:ok, buyer} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Buyers.create_buyer()

      buyer
    end

    test "list_buyers/0 returns all buyers" do
      buyer = buyer_fixture()
      assert Buyers.list_buyers() == [buyer]
    end

    test "get_buyer!/1 returns the buyer with given id" do
      buyer = buyer_fixture()
      assert Buyers.get_buyer!(buyer.id) == buyer
    end

    test "create_buyer/1 with valid data creates a buyer" do
      assert {:ok, %Buyer{} = buyer} = Buyers.create_buyer(@valid_attrs)
      assert buyer.email == "some email"
      assert buyer.name == "some name"
      assert buyer.password_hash == "some password_hash"
    end

    test "create_buyer/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Buyers.create_buyer(@invalid_attrs)
    end

    test "update_buyer/2 with valid data updates the buyer" do
      buyer = buyer_fixture()
      assert {:ok, %Buyer{} = buyer} = Buyers.update_buyer(buyer, @update_attrs)
      assert buyer.email == "some updated email"
      assert buyer.name == "some updated name"
      assert buyer.password_hash == "some updated password_hash"
    end

    test "update_buyer/2 with invalid data returns error changeset" do
      buyer = buyer_fixture()
      assert {:error, %Ecto.Changeset{}} = Buyers.update_buyer(buyer, @invalid_attrs)
      assert buyer == Buyers.get_buyer!(buyer.id)
    end

    test "delete_buyer/1 deletes the buyer" do
      buyer = buyer_fixture()
      assert {:ok, %Buyer{}} = Buyers.delete_buyer(buyer)
      assert_raise Ecto.NoResultsError, fn -> Buyers.get_buyer!(buyer.id) end
    end

    test "change_buyer/1 returns a buyer changeset" do
      buyer = buyer_fixture()
      assert %Ecto.Changeset{} = Buyers.change_buyer(buyer)
    end
  end
end
