export const authHeader = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return {
    Authorization:
      `Bearer ${userInfo?.token}`,
  };
};