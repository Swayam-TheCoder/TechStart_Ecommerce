import { useEffect, useState } from "react";

import { API, getBlogs } from "../services/api";
import { authHeader } from "../services/authHeader";

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(() => {
  const savedDraft = localStorage.getItem("blogDraft");

  return savedDraft
    ? JSON.parse(savedDraft)
    : {
        title: "",
        description: "",
        image: null,
        category: "",
        content: "",
      };
});

  // =====================
  // FETCH BLOGS
  // =====================

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();

      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
  localStorage.setItem(
    "blogDraft",
    JSON.stringify({
      ...formData,
      image: null,
    }),
  );
}, [formData]);

  // =====================
  // HANDLE INPUT
  // =====================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // =====================
  // ADD BLOG
  // =====================

  const addBlog = async () => {
    try {
      const data = new FormData();

      data.append("title", formData.title);

      data.append("description", formData.description);

      data.append("category", formData.category);

      data.append("content", formData.content);

      data.append("image", formData.image);

      const response = await fetch(
        editingId ? `${API}/api/blogs/${editingId}` : `${API}/api/blogs`,

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

      alert("Blog Added Successfully");
      localStorage.removeItem("blogDraft");
      setEditingId(null);

      setFormData({
        title: "",

        description: "",

        image: null,

        category: "",

        content: "",
      });

      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  // =====================
  // DELETE BLOG
  // =====================

  const deleteBlog = async (id) => {
    try {
      await fetch(`${API}/api/blogs/${id}`, {
        method: "DELETE",

        headers: authHeader(),
      });

      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);

    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6 py-10
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
        Manage Blogs
      </h1>

      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBlog();
        }}
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
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5 py-4
            rounded-xl
            outline-none
          "
        />

        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5 py-4
            rounded-xl
            outline-none
          "
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

        {editingId && (
          <p className="text-zinc-400 text-sm">
            Leave image empty to keep old image
          </p>
        )}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5 py-4
            rounded-xl
            outline-none
          "
        />

        <textarea
          name="content"
          placeholder="Full Blog Content"
          rows="8"
          value={formData.content}
          onChange={handleChange}
          className="
            bg-zinc-800
            px-5 py-4
            rounded-xl
            outline-none
          "
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
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* BLOGS */}
      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      "
      >
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="
              bg-zinc-900
              rounded-3xl
              overflow-hidden
            "
          >
            <div className="p-5">
              <h2
                className="
                text-2xl
                font-bold
                mb-3
              "
              >
                {blog.title}
              </h2>

              <p
                className="
                text-zinc-400
                mb-5
              "
              >
                {blog.description}
              </p>

              <div
                className="
    text-zinc-300
    text-lg
    leading-8
    whitespace-pre-line
    mt-8
  "
              >
                {blog.content}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingId(blog._id);

                    setFormData({
                      title: blog.title || "",
                      description: blog.description || "",
                      image: null,
                      category: blog.category || "",
                      content: blog.content || "",
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
    transition
  "
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="
                  bg-red-500
                  hover:bg-red-600
                  px-5 py-2
                  rounded-xl
                  transition
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

export default AdminBlogs;
