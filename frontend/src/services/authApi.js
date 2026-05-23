import { API } from "./api";
// ======================
// REGISTER
// ======================

export const registerUser = async (userData) => {
  const response = await fetch(
    `${API}/api/auth/register`,

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    },
  );
  return response.json();
};

// ======================
// LOGIN
// ======================

export const loginUser = async (userData) => {
  const response = await fetch(
    `${API}/api/auth/login`,

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
