defmodule EstoreappWeb.ReviewView do
  use EstoreappWeb, :view
  alias EstoreappWeb.ReviewView

  def render("index.json", %{reviews: reviews}) do
    %{data: render_many(reviews, ReviewView, "review.json")}
  end

  def render("show.json", %{review: review}) do
    %{data: render_one(review, ReviewView, "review.json")}
  end

  def render("review.json", %{review: review}) do
    %{id: review.id,
      user: review.user,
      product_id: review.product_id,
      review: review.review}
  end
end
