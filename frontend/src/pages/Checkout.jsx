import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const { userInfo } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(
    JSON.parse(
      localStorage.getItem("shippingAddress")
    ) || {
    fullName: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,

      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(shippingAddress)
  );

}, [shippingAddress]);

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
        Checkout
      </h1>

      <div
        className="
          max-w-5xl
          mx-auto
          grid
          md:grid-cols-2
          gap-8
        "
      >
        {/* SHIPPING */}

        <div
          className="
            bg-zinc-900
            p-8
            rounded-2xl
          "
        >
          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            Shipping Details
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shippingAddress.fullName}
              onChange={handleChange}
              className="
                w-full
                bg-zinc-800
                p-4
                rounded-xl
                outline-none
              "
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={shippingAddress.email}
              onChange={handleChange}
              className="
                w-full
                bg-zinc-800
                p-4
                rounded-xl
                outline-none
              "
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={shippingAddress.phone}
              onChange={handleChange}
              className="
                w-full
                bg-zinc-800
                p-4
                rounded-xl
                outline-none
              "
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={shippingAddress.address}
              onChange={handleChange}
              rows="4"
              className="
                w-full
                bg-zinc-800
                p-4
                rounded-xl
                outline-none
                resize-none
              "
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleChange}
              className="
                w-full
                bg-zinc-800
                p-4
                rounded-xl
                outline-none
              "
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={shippingAddress.state}
              onChange={handleChange}
              className="
                w-full
                bg-zinc-800
                p-4
                rounded-xl
                outline-none
              "
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={shippingAddress.pincode}
              onChange={handleChange}
              className="
                w-full
                bg-zinc-800
                p-4
                rounded-xl
                outline-none
              "
            />
          </div>
        </div>

        {/* ORDER SUMMARY */}

        <div
          className="
            bg-zinc-900
            p-8
            rounded-2xl
            pl-7
          "
        >
          <h2
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="
                  flex
                  justify-between
                  border-b
                  border-zinc-700
                  pb-4
                "
              >
                <span>
                  {item.title}

                  <div className="text-zinc-400 ">
                    Quantity: {item.quantity}
                  </div>
                </span>

                <span className="text-cyan-400 font-bold ml-7">
                  ₹ {item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div
            className="
              mt-8
              flex
              justify-between
              text-2xl
              font-bold
            "
          >
            <span>Total</span>

            <span>₹ {totalPrice}</span>
          </div>

          <button
            className="
              mt-8
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              py-4
              rounded-xl
              font-bold
              text-lg
              transition
            "
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
