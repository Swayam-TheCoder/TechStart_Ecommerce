import { useEffect, useState } from "react";

import { API, getProducts } from "../services/api";
import { authHeader } from "../services/authHeader";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem("productDraft");

    return savedDraft
      ? JSON.parse(savedDraft)
      : {
          title: "",
          description: "",
          image: null,
          categories: "",
          price: "",
          link: "",
        };
  });

  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "productDraft",
      JSON.stringify({
        ...formData,
        image: null,
      }),
    );
  }, [formData]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE IMAGE
  // =========================

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // =========================
  // ADD PRODUCT
  // =========================

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      // DEBUG
      console.log(formData);

      const data = new FormData();

      data.append("title", formData.title);

      data.append("description", formData.description);

      data.append("categories", formData.categories);

      data.append("price", formData.price);

      data.append("link", formData.link);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch(
        editingId ? `${API}/api/products/${editingId}` : `${API}/api/products`,

        {
          method: editingId ? "PUT" : "POST",

          headers: authHeader(),

          body: data,
        },
      );

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        alert(result.message);

        return;
      }

      alert("Product Added");
      localStorage.removeItem("productDraft");

      fetchProducts();

      // RESET FORM
      setFormData({
        title: "",
        description: "",
        image: null,
        categories: "",
        price: "",
        link: "",
      });
      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API}/api/products/${id}`, {
        method: "DELETE",

        headers: authHeader(),
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6
      py-10
    "
    >
      <h1
        className="
        text-5xl
        font-bold
        text-cyan-400
        mb-10
      "
      >
        Manage Products
      </h1>

      {/* FORM */}

      <form
        onSubmit={addProduct}
        className="
          bg-zinc-900
          p-8
          rounded-3xl
          mb-12
          grid
          gap-5
        "
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5
            py-4
            rounded-xl
            outline-none
          "
          required
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5
            py-4
            rounded-xl
            outline-none
          "
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="
            bg-zinc-800
            px-5
            py-4
            rounded-xl
          "
          required={!editingId}
        />

        <input
          type="text"
          name="categories"
          value={formData.categories}
          placeholder="Categories (comma-separated)"
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5
            py-4
            rounded-xl
            outline-none
          "
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Price"
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5
            py-4
            rounded-xl
            outline-none
          "
          required
        />

        <input
          type="text"
          name="link"
          value={formData.link}
          placeholder="Affiliate Link"
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5
            py-4
            rounded-xl
            outline-none
          "
          required
        />

        <button
          type="submit"
          className="
            bg-cyan-500
            hover:bg-cyan-600
            py-4
            rounded-xl
            font-bold
            transition
          "
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* PRODUCTS */}

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      "
      >
        {products.map((product) => (
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
                mb-3
              "
              >
                {product.title}
              </h2>

              <h3
                className="
                text-cyan-400
                text-xl
                mb-4
              "
              >
                ₹{product.price}
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingId(product._id);

                    setFormData({
                      title: product.title,
                      description: product.description,
                      image: null,
                      categories: product.categories.join(", "),
                      price: product.price,
                      link: product.link,
                    });

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
    bg-yellow-500
    hover:bg-yellow-600
    px-5 py-2
    rounded-xl
  "
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="
                  bg-red-500
                  hover:bg-red-600
                  px-5
                  py-2
                  rounded-xl
                "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
