defmodule Estoreapp.Buyers do
  @moduledoc """
  The Buyers context.
  """

  import Ecto.Query, warn: false
  alias Estoreapp.Repo

  alias Estoreapp.Buyers.Buyer

  @doc """
  Returns the list of buyers.

  ## Examples

      iex> list_buyers()
      [%Buyer{}, ...]

  """
  def list_buyers do
    Repo.all(Buyer)
  end

  @doc """
  Gets a single buyer.

  Raises `Ecto.NoResultsError` if the Buyer does not exist.

  ## Examples

      iex> get_buyer!(123)
      %Buyer{}

      iex> get_buyer!(456)
      ** (Ecto.NoResultsError)

  """
  def get_buyer!(id), do: Repo.get!(Buyer, id)

  def authenticate_user(email, password) do
    user = Repo.get_by(Buyer, email: email)
    case Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _else       -> nil
    end
  end

  @doc """
  Creates a buyer.

  ## Examples

      iex> create_buyer(%{field: value})
      {:ok, %Buyer{}}

      iex> create_buyer(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_buyer(attrs \\ %{}) do
    %Buyer{}
    |> Buyer.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a buyer.

  ## Examples

      iex> update_buyer(buyer, %{field: new_value})
      {:ok, %Buyer{}}

      iex> update_buyer(buyer, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_buyer(%Buyer{} = buyer, attrs) do
    buyer
    |> Buyer.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Buyer.

  ## Examples

      iex> delete_buyer(buyer)
      {:ok, %Buyer{}}

      iex> delete_buyer(buyer)
      {:error, %Ecto.Changeset{}}

  """
  def delete_buyer(%Buyer{} = buyer) do
    Repo.delete(buyer)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking buyer changes.

  ## Examples

      iex> change_buyer(buyer)
      %Ecto.Changeset{source: %Buyer{}}

  """
  def change_buyer(%Buyer{} = buyer) do
    Buyer.changeset(buyer, %{})
  end
end
