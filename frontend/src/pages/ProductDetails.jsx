import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API}/api/products/${id}`,
        );

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
      flex
      items-center
      justify-center
    "
    >
      <div
        className="
        bg-zinc-900
        rounded-2xl
        overflow-hidden
        max-w-5xl
        w-full
        grid
        md:grid-cols-2
        gap-8
        p-6
      "
      >
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full
            h-[400px]
            object-cover
            rounded-xl
          "
        />

        {/* CONTENT */}
        <div
  className="
    flex
    flex-col
    justify-center
  "
>
  <h1
    className="
      text-2xl
      sm:text-3xl
      lg:text-4xl
      font-bold
      text-cyan-400
      mb-4
      lg:mb-6
      leading-tight
    "
  >
    {product.title}
  </h1>

  <p
    className="
      text-sm
      sm:text-base
      lg:text-lg
      text-zinc-300
      leading-7
      lg:leading-8
      mb-6
      lg:mb-8
    "
  >
    {product.description}
  </p>

  <button
    onClick={() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        navigate("/login");
        return;
      }

    }}
    className="
      bg-cyan-500
      hover:bg-cyan-600
      px-5
      sm:px-6
      py-3
      rounded-xl
      font-semibold
      text-sm
      sm:text-base
      transition
      w-full
      sm:w-fit
    "
  >
    Buy Now
  </button>
</div>
      </div>
    </div>
  );
}

export default ProductDetails;
