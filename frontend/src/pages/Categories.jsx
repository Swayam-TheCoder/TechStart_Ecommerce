import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/api";

import Loader from "../components/Loader";

function Categories() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [priceFilter, setPriceFilter] = useState("All");

  const [sortOption, setSortOption] = useState("Newest");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    "Laptop",
    "Audio",
    "Gaming",
    "Accessories",
    "Keyboard",
    "Mouse",
    "Smartphones",
    "Tablet",
  ];

  // Price filters for each category
  const categoryPriceFilters = {
    All: [{ label: "All Prices", value: "All" }],

    Laptop: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹40,000", value: "Under40000" },
      { label: "₹40,000 - ₹80,000", value: "40000to80000" },
      { label: "Above ₹80,000", value: "Above80000" },
    ],

    Gaming: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹2,000", value: "Under2000" },
      { label: "₹2,000 - ₹10,000", value: "2000to10000" },
      { label: "Above ₹10,000", value: "Above10000" },
    ],

    Audio: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹1,000", value: "Under1000" },
      { label: "₹1,000 - ₹5,000", value: "1000to5000" },
      { label: "Above ₹5,000", value: "Above5000" },
    ],

    Accessories: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹500", value: "Under500" },
      { label: "₹500 - ₹2,000", value: "500to2000" },
      { label: "Above ₹2,000", value: "Above2000" },
    ],

    Keyboard: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹2,000", value: "Under2000" },
      { label: "₹2,000 - ₹5,000", value: "2000to5000" },
      { label: "Above ₹5,000", value: "Above5000" },
    ],

    Mouse: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹500", value: "Under500" },
      { label: "₹500 - ₹1,000", value: "500to1000" },
      { label: "Above ₹1,000", value: "Above1000" },
    ],

    Smartphones: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹10,000", value: "Under10000" },
      { label: "₹10,000 - ₹25,000", value: "10000to25000" },
      { label: "Above ₹25,000", value: "Above25000" },
    ],

    Tablet: [
      { label: "All Prices", value: "All" },
      { label: "Under ₹20,000", value: "Under20000" },
      { label: "₹20,000 - ₹30,000", value: "20000to30000" },
      { label: "Above ₹30,000", value: "Above30000" },
    ],

  };

  const filteredProducts = products

    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.categories.includes(selectedCategory);

      let matchesPrice;

      switch (priceFilter) {
        case "Under500":
          matchesPrice = product.price < 500;
          break;
        
        case "500to1000":
          matchesPrice = product.price >= 500 && product.price <= 1000;
          break;

        case "500to2000":
          matchesPrice = product.price >= 500 && product.price <= 2000;
          break;
        
        case "Above1000":
          matchesPrice = product.price > 1000;
          break;

        case "Above2000":
          matchesPrice = product.price > 2000;
          break;

        case "Under1000":
          matchesPrice = product.price < 1000;
          break;

        case "1000to5000":
          matchesPrice = product.price >= 1000 && product.price <= 5000;
          break;

        case "Above5000":
          matchesPrice = product.price > 5000;
          break;

        case "Under2000":
          matchesPrice = product.price < 2000;
          break;

        case "2000to5000":
          matchesPrice = product.price >= 2000 && product.price <= 5000;
          break;

        case "2000to10000":
          matchesPrice = product.price >= 2000 && product.price <= 10000;
          break;

        case "Above10000":
          matchesPrice = product.price > 10000;
          break;

        case "Under10000":
          matchesPrice = product.price < 10000;
          break;

        case "Under20000":
          matchesPrice = product.price < 20000;
          break;

        case "10000to25000":
          matchesPrice = product.price >= 10000 && product.price <= 25000;
          break;

        case "20000to30000":
          matchesPrice = product.price >= 20000 && product.price <= 30000;
          break;

        case "Above25000":
          matchesPrice = product.price > 25000;
          break;

        case "Above30000":
          matchesPrice = product.price > 30000;
          break;

        case "Under40000":
          matchesPrice = product.price < 40000;
          break;

        case "40000to80000":
          matchesPrice = product.price >= 40000 && product.price <= 80000;
          break;

        case "Above80000":
          matchesPrice = product.price > 80000;
          break;

        default:
          matchesPrice = true;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    })

    .sort((a, b) => {
      if (sortOption === "Price Low → High") {
        return a.price - b.price;
      }

      if (sortOption === "Price High → Low") {
        return b.price - a.price;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

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
        Categories
      </h1>

      {/* SEARCH */}
      <div
        className="
        max-w-xl
        mx-auto
        mb-10
      "
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-5 py-4
            outline-none
          "
        />
      </div>

      {/* CATEGORY */}
      <div
        className="
        flex
        flex-wrap
        gap-4
        justify-center
        mb-10
      "
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setPriceFilter("All");
            }}
            className={`
                px-5 py-2
                rounded-xl
                font-semibold

                ${selectedCategory === category ? "bg-cyan-500" : "bg-zinc-800"}
              `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRICE */}
      <div
        className="
    flex
    justify-center
    gap-4
    mb-10
    flex-wrap
  "
      >
        {categoryPriceFilters[selectedCategory].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setPriceFilter(filter.value)}
            className={`
          px-5 py-2
          rounded-xl
          font-semibold
          transition

          ${
            priceFilter === filter.value
              ? "bg-cyan-500 text-white"
              : "bg-zinc-800 text-zinc-300"
          }
        `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div
        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      "
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
