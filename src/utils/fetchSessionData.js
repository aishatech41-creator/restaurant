

export const fetchSessionUser = () => {
  const userString = localStorage.getItem("user");

  if (!userString || userString === "undefined") {
    localStorage.removeItem("user");
    return null;
  }

  try {
    return JSON.parse(userString);
  } catch (e) {
    localStorage.removeItem("user");
    return null;
  }
};
export const fetchSessionCart = () => {
  const cartString = localStorage.getItem("cartItems");
  if (!cartString || cartString === "undefined" || cartString === "null") {
    return [];
  }
  try {
    return JSON.parse(cartString);
  } catch (e) {
    return [];
  }
};

// session usermode
export const fetchSessionUserMode = () => {
  const adminMode =
    localStorage.getItem("adminMode") !== "undefined"
      ? JSON.parse(localStorage.getItem("adminMode"))
      : false;

  return adminMode ? adminMode : false;
}
