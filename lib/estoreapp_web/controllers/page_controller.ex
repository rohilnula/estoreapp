defmodule EstoreappWeb.PageController do
  use EstoreappWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
