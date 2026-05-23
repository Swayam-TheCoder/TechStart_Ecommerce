import { useEffect, useState } from "react";

import BlogCard from "../components/BlogCard";

import { getBlogs } from "../services/api";

import Loader from "../components/Loader";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();

        setBlogs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
        text-center
        mb-12
      "
      >
        Tech Blogs
      </h1>

      {blogs.length === 0 && (
        <h1
          className="
      text-center
      text-2xl
      text-zinc-400
    "
        >
          No Blogs Found
        </h1>
      )}
      <div
        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      "
      >
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
