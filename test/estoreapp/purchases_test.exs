defmodule Estoreapp.PurchasesTest do
  use Estoreapp.DataCase

  alias Estoreapp.Purchases

  describe "purchases" do
    alias Estoreapp.Purchases.Purchase

    @valid_attrs %{product_name: "some product_name", quantity: 42, user_id: 42}
    @update_attrs %{product_name: "some updated product_name", quantity: 43, user_id: 43}
    @invalid_attrs %{product_name: nil, quantity: nil, user_id: nil}

    def purchase_fixture(attrs \\ %{}) do
      {:ok, purchase} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Purchases.create_purchase()

      purchase
    end

    test "list_purchases/0 returns all purchases" do
      purchase = purchase_fixture()
      assert Purchases.list_purchases() == [purchase]
    end

    test "get_purchase!/1 returns the purchase with given id" do
      purchase = purchase_fixture()
      assert Purchases.get_purchase!(purchase.id) == purchase
    end

    test "create_purchase/1 with valid data creates a purchase" do
      assert {:ok, %Purchase{} = purchase} = Purchases.create_purchase(@valid_attrs)
      assert purchase.product_name == "some product_name"
      assert purchase.quantity == 42
      assert purchase.user_id == 42
    end

    test "create_purchase/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Purchases.create_purchase(@invalid_attrs)
    end

    test "update_purchase/2 with valid data updates the purchase" do
      purchase = purchase_fixture()
      assert {:ok, %Purchase{} = purchase} = Purchases.update_purchase(purchase, @update_attrs)
      assert purchase.product_name == "some updated product_name"
      assert purchase.quantity == 43
      assert purchase.user_id == 43
    end

    test "update_purchase/2 with invalid data returns error changeset" do
      purchase = purchase_fixture()
      assert {:error, %Ecto.Changeset{}} = Purchases.update_purchase(purchase, @invalid_attrs)
      assert purchase == Purchases.get_purchase!(purchase.id)
    end

    test "delete_purchase/1 deletes the purchase" do
      purchase = purchase_fixture()
      assert {:ok, %Purchase{}} = Purchases.delete_purchase(purchase)
      assert_raise Ecto.NoResultsError, fn -> Purchases.get_purchase!(purchase.id) end
    end

    test "change_purchase/1 returns a purchase changeset" do
      purchase = purchase_fixture()
      assert %Ecto.Changeset{} = Purchases.change_purchase(purchase)
    end
  end

  describe "purchases" do
    alias Estoreapp.Purchases.Purchase

    @valid_attrs %{order_id: 42, price: 120.5, product_name: "some product_name", quantity: 42, user_name: "some user_name"}
    @update_attrs %{order_id: 43, price: 456.7, product_name: "some updated product_name", quantity: 43, user_name: "some updated user_name"}
    @invalid_attrs %{order_id: nil, price: nil, product_name: nil, quantity: nil, user_name: nil}

    def purchase_fixture(attrs \\ %{}) do
      {:ok, purchase} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Purchases.create_purchase()

      purchase
    end

    test "list_purchases/0 returns all purchases" do
      purchase = purchase_fixture()
      assert Purchases.list_purchases() == [purchase]
    end

    test "get_purchase!/1 returns the purchase with given id" do
      purchase = purchase_fixture()
      assert Purchases.get_purchase!(purchase.id) == purchase
    end

    test "create_purchase/1 with valid data creates a purchase" do
      assert {:ok, %Purchase{} = purchase} = Purchases.create_purchase(@valid_attrs)
      assert purchase.order_id == 42
      assert purchase.price == 120.5
      assert purchase.product_name == "some product_name"
      assert purchase.quantity == 42
      assert purchase.user_name == "some user_name"
    end

    test "create_purchase/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Purchases.create_purchase(@invalid_attrs)
    end

    test "update_purchase/2 with valid data updates the purchase" do
      purchase = purchase_fixture()
      assert {:ok, %Purchase{} = purchase} = Purchases.update_purchase(purchase, @update_attrs)
      assert purchase.order_id == 43
      assert purchase.price == 456.7
      assert purchase.product_name == "some updated product_name"
      assert purchase.quantity == 43
      assert purchase.user_name == "some updated user_name"
    end

    test "update_purchase/2 with invalid data returns error changeset" do
      purchase = purchase_fixture()
      assert {:error, %Ecto.Changeset{}} = Purchases.update_purchase(purchase, @invalid_attrs)
      assert purchase == Purchases.get_purchase!(purchase.id)
    end

    test "delete_purchase/1 deletes the purchase" do
      purchase = purchase_fixture()
      assert {:ok, %Purchase{}} = Purchases.delete_purchase(purchase)
      assert_raise Ecto.NoResultsError, fn -> Purchases.get_purchase!(purchase.id) end
    end

    test "change_purchase/1 returns a purchase changeset" do
      purchase = purchase_fixture()
      assert %Ecto.Changeset{} = Purchases.change_purchase(purchase)
    end
  end
end
