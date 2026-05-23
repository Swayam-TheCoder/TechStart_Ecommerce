import { Link } from "react-router-dom";

import { addToWishlist } from "../utils/wishlist";

function ProductCard({ product }) {
  return (
    <div
      className="
        bg-zinc-900
        rounded-2xl
        overflow-hidden
        shadow-lg
        hover:-translate-y-2
        transition
        duration-300
        flex
        flex-col
        h-full
      "
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full
            h-56
            object-cover
            hover:scale-110
            transition
            duration-500
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          p-5
          flex
          flex-col
          flex-1
        "
      >
        {/* TITLE */}
        <h2
          className="
            text-xl
            font-bold
            text-white
            mb-3
            line-clamp-2
            min-h-[60px]
          "
        >
          {product.title}
        </h2>

        {/* PRICE */}
        <h3
          className="
            text-3xl
            font-bold
            text-green-400
            mb-4
          "
        >
          ₹{product.price}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            text-zinc-400
            mb-6
            leading-7
            line-clamp-3
            flex-1
          "
        >
          {product.description}
        </p>

        {/* BUTTONS */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            mt-auto
          "
        >
          <Link
            to={`/product/${product._id}`}
            className="
              flex-1
              text-center
              bg-cyan-500
              hover:bg-cyan-600
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            View Details
          </Link>

          <button
            onClick={() => {
              addToWishlist(product);
            }}
            className="
              bg-zinc-800
              hover:bg-zinc-700
              text-white
              px-4
              py-3
              rounded-xl
              transition
              whitespace-nowrap
            "
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;