export const API = "http://localhost:5000";
// 
// =========================
// GET PRODUCTS
// =========================

export const getProducts = async () => {
  try {
    const response = await fetch(
      `${API}/api/products`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch products"
      );
    }

    const data =
      await response.json();

    return data || [];

  } catch (error) {

    console.log(error);

    return [];
  }
};

// =========================
// GET BLOGS
// =========================

export const getBlogs = async () => {
  try {
    const response = await fetch(
      `${API}/api/blogs`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch blogs"
      );
    }

    const data =
      await response.json();

    return data || [];

  } catch (error) {

    console.log(error);

    return [];
  }
};