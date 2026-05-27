export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// ======================
// ADD TO CART
// ======================

export const addToCart = (product) => {

  const cart = getCart();

  const existingProduct = cart.find(
    (item) => item._id === product._id
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1,
    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
  window.dispatchEvent(
  new Event("storage")
);
};

// ======================
// REMOVE CART ITEM
// ======================

export const removeCartItem = (id) => {

  const cart = getCart().filter(
    (item) => item._id !== id
  );

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
  window.dispatchEvent(
  new Event("storage")
);
};

// ======================
// UPDATE QUANTITY
// ======================

export const updateQuantity = (
  id,
  type
) => {

  const cart = getCart();

  const updatedCart = cart.map(
    (item) => {

      if (item._id === id) {

        if (type === "increase") {
          item.quantity += 1;
        }

        if (
          type === "decrease" &&
          item.quantity > 1
        ) {
          item.quantity -= 1;
        }
      }

      return item;
    }
  );

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
  window.dispatchEvent(
  new Event("storage")
);
};