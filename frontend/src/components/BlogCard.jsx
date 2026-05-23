import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div
      className="
      bg-zinc-900
      rounded-2xl
      overflow-hidden
      shadow-lg
      hover:scale-105
      transition
      duration-300
    "
    >
      {/* IMAGE */}
      <img
        src={blog.image}
        alt={blog.title}
        className="
          w-full
          h-56
          object-cover
        "
      />

      {/* CONTENT */}
      <div className="p-5">
        <h2
          className="
          text-xl
          font-bold
          text-white
          mb-3
        "
        >
          {blog.title}
        </h2>

        <p
          className="
          text-zinc-400
          mb-4
        "
        >
          {blog.description}
        </p>

        <Link
          to={`/blog/${blog._id}`}
          className="
    inline-block
    mt-4
    bg-cyan-500
    hover:bg-cyan-600
    px-5 py-2
    rounded-xl
    transition
  "
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
