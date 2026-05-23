export const addToWishlist =
  (product) => {

    const wishlist =

      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || [];


    const exists =

      wishlist.some(
        (item) =>
          item._id === product._id
      );


    if (!exists) {

      wishlist.push(product);

      localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)
      );
    }
};


export const getWishlist =
  () => {

    return (

      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || []
    );
};


export const removeWishlist =
  (id) => {

    const updatedWishlist =

      getWishlist().filter(
        (item) =>
          item._id !== id
      );


    localStorage.setItem(

      "wishlist",

      JSON.stringify(
        updatedWishlist
      )
    );
};