import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { authHeader } from "../services/authHeader";
import { API } from "../services/api";


function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API}/api/admin/stats`, {
          headers: authHeader(),
        });

        const data = await response.json();

        console.log(data);

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div
        className="
        min-h-screen
        bg-zinc-950
        text-white
        flex
        items-center
        justify-center
        text-3xl
      "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-8
      py-10
    "
    >
      <h1
        className="
        text-5xl
        font-bold
        text-cyan-400
        mb-12
      "
      >
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div
        className="
        grid
        md:grid-cols-3
        gap-8
        mb-16
      "
      >
        <div
          className="
          bg-zinc-900
          p-8
          rounded-3xl
        "
        >
          <h2
            className="
            text-zinc-400
            text-lg
            mb-2
          "
          >
            Total Products
          </h2>

          <h1
            className="
            text-5xl
            font-bold
            text-cyan-400
          "
          >
            {stats.totalProducts}
          </h1>
        </div>

        <div
          className="
          bg-zinc-900
          p-8
          rounded-3xl
        "
        >
          <h2
            className="
            text-zinc-400
            text-lg
            mb-2
          "
          >
            Total Blogs
          </h2>

          <h1
            className="
            text-5xl
            font-bold
            text-pink-400
          "
          >
            {stats.totalBlogs}
          </h1>
        </div>

        <div
          className="
          bg-zinc-900
          p-8
          rounded-3xl
        "
        >
          <h2
            className="
            text-zinc-400
            text-lg
            mb-2
          "
          >
            Users
          </h2>

          <h1
            className="
            text-5xl
            font-bold
            text-green-400
          "
          >
            {stats.totalUsers}
          </h1>
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
        grid
        md:grid-cols-4
        gap-8
        mb-16
      "
      >
        <button
          onClick={() => navigate("/admin/products")}
          className="
            bg-cyan-500
            hover:bg-cyan-600
            p-8
            rounded-3xl
            text-2xl
            font-bold
            transition
          "
        >
          Manage Products
        </button>

        <button
          onClick={() => navigate("/admin/blogs")}
          className="
            bg-pink-500
            hover:bg-pink-600
            p-8
            rounded-3xl
            text-2xl
            font-bold
            transition
          "
        >
          Manage Blogs
        </button>

        <button
          onClick={() => navigate("/admin/users")}
          className="
    bg-yellow-500
    hover:bg-yellow-600
    p-8
    rounded-3xl
    text-2xl
    font-bold
    transition
  "
        >
          Check Emails
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/contacts")}
          className="
    bg-green-500
    hover:bg-green-600
    p-8
    rounded-3xl
    text-2xl
    font-bold
    transition
  "
        >
          Contacts
        </button>
      </div>

      {/* LATEST PRODUCTS */}
      <div className="mb-16">
        <h1
          className="
          text-3xl
          font-bold
          mb-8
        "
        >
          Latest Products
        </h1>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
        >
          {stats?.latestProducts?.map((product) => (
            <div
              key={product._id}
              className="
                  bg-zinc-900
                  rounded-3xl
                  overflow-hidden
                "
            >
              <img
                src={product.image}
                alt={product.title}
                className="
                    h-56
                    w-full
                    object-cover
                  "
              />

              <div className="p-5">
                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-2
                  "
                >
                  {product.title}
                </h2>

                <h3
                  className="
                    text-cyan-400
                    text-xl
                  "
                >
                  ₹{product.price}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
