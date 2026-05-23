import {
  useEffect,
  useState
} from "react";

import ProductCard
from "../components/ProductCard";

import {
  getWishlist,
  removeWishlist
} from "../utils/wishlist";


function Wishlist() {

  const [wishlist, setWishlist] =
    useState([]);


  useEffect(() => {

    setWishlist(
      getWishlist()
    );

  }, []);


  const handleRemove =
  (id) => {

    removeWishlist(id);

    setWishlist(
      getWishlist()
    );
};


  return (

    <div className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6
      py-10
    ">

      <h1 className="
        text-5xl
        font-bold
        text-cyan-400
        text-center
        mb-12
      ">
        Wishlist
      </h1>


      {
        wishlist.length === 0 && (

          <h1 className="
            text-center
            text-zinc-400
            text-2xl
          ">
            Wishlist Empty
          </h1>
        )
      }


      <div className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {wishlist.map((product) => (

  <div
    key={product._id}
    className="relative"
  >

    <ProductCard
      product={product}
    />


    <button
      onClick={() =>
        handleRemove(
          product._id
        )
      }
      className="
        absolute
        top-4
        right-4
        bg-red-500
        hover:bg-red-600
        px-4 py-2
        rounded-xl
        text-white
        font-semibold
        transition
      "
    >
      Remove
    </button>
  </div>
))}

      </div>

    </div>
  );
}

export default Wishlist;