import { useEffect, useState } from "react";
import { getCart, removeCartItem, updateQuantity } from "../utils/cart";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    setCart(getCart());
  }, []);

  const refreshCart = () => {
    setCart(getCart());
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

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
        My Cart
      </h1>

      {cart.length === 0 && (
        <h1
          className="
            text-center
            text-zinc-400
            text-2xl
          "
        >
          Cart Empty
        </h1>
      )}

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="
              bg-zinc-900
              p-6
              rounded-2xl
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-6
            "
          >
            <div className="flex items-center gap-6">
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-28
                  h-28
                  object-cover
                  rounded-xl
                "
              />

              <div>
                <h2 className="text-2xl font-bold">{item.title}</h2>

                <p className="text-cyan-400 text-xl mt-2">₹ {item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  updateQuantity(item._id, "decrease");

                  refreshCart();
                }}
                className="
                  bg-zinc-700
                  px-4
                  py-2
                  rounded-lg
                "
              >
                -
              </button>

              <span className="text-xl">{item.quantity}</span>

              <button
                onClick={() => {
                  updateQuantity(item._id, "increase");

                  refreshCart();
                }}
                className="
                  bg-zinc-700
                  px-4
                  py-2
                  rounded-lg
                "
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                removeCartItem(item._id);

                refreshCart();
              }}
              className="
                bg-red-500
                hover:bg-red-600
                px-5
                py-3
                rounded-xl
                font-semibold
              "
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div
          className="
            mt-12
            bg-zinc-900
            p-8
            rounded-2xl
            text-center
          "
        >
          <h1 className="text-3xl font-bold">Total: ₹ {totalPrice}</h1>

          <button
            onClick={() => navigate("/checkout")}
            className="
    mt-6
    bg-cyan-500
    hover:bg-cyan-600
    px-8
    py-4
    rounded-xl
    font-bold
    text-lg
    transition
  "
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
