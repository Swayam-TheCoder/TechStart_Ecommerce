import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { API } from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API}/api/blogs/${id}`);

        const data = await response.json();

        setBlog(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <h1
        className="
        text-white
        text-center
        mt-20
      "
      >
        Loading...
      </h1>
    );
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
      <div
        className="
        max-w-4xl
        mx-auto
      "
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="
            w-full
            h-[400px]
            object-cover
            rounded-2xl
            mb-8
          "
        />

        <h1
          className="
          text-5xl
          font-bold
          text-cyan-400
          mb-6
        "
        >
          {blog.title}
        </h1>

        <p
          className="
          text-zinc-300
          leading-8
          text-lg
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
      </div>
    </div>
  );
}

export default BlogDetails;
