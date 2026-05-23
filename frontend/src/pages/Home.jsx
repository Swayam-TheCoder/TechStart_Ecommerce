import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/api";

import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const categories = [
    "All",
    "Laptop",
    "Audio",
    "Gaming",
    "Accessories",
    "Keyboard",
    "Monitor",
  ];

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
      {/* HERO */}
      <div
        className="
        text-center
        mb-16
      "
      >
        <h1
          className="
          text-5xl
          font-bold
          text-cyan-400
          mb-5
        "
        >
          Smart Tech Picks
        </h1>

        <p
          className="
          text-zinc-400
          text-lg
          max-w-2xl
          mx-auto
        "
        >
          Discover the best gadgets, laptops, accessories and tech products
          curated for developers and students.
        </p>
      </div>

      {/* LAPTOPS */}
      <div className="mb-20">
        <h1
          className="
    text-4xl
    font-bold
    text-cyan-400
    mb-8
  "
        >
          Laptops
        </h1>

        <div
          className="
    grid
    sm:grid-cols-2
    lg:grid-cols-3
    gap-8
  "
        >
          {products

            .filter((product) => product.categories.includes("Laptop"))

            .slice(0, 3)

            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>

      {/* GAMING */}
      <div className="mb-20">
        <h1
          className="
    text-4xl
    font-bold
    text-cyan-400
    mb-8
  "
        >
          Gaming
        </h1>

        <div
          className="
    grid
    sm:grid-cols-2
    lg:grid-cols-3
    gap-8
  "
        >
          {products

            .filter((product) => product.categories.includes("Gaming"))

            .slice(0, 3)

            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>

      {/* AUDIO */}
      <div className="mb-20">
        <h1
          className="
    text-4xl
    font-bold
    text-cyan-400
    mb-8
  "
        >
          Audio
        </h1>

        <div
          className="
    grid
    sm:grid-cols-2
    lg:grid-cols-3
    gap-8
  "
        >
          {products

            .filter((product) => product.categories.includes("Audio"))

            .slice(0, 3)

            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
