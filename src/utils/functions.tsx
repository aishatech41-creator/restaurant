import { FoodItem, cartItem } from "../../types";
import { cartService } from "../services/cartService";
import { foodService } from "../services/foodService";
import { authService } from "../services/authService";


import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";

export const addToCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  user: any,
  fid: number,
  dispatch: any
) => {
  if (!user) {
    toast.error("Please login to add items to cart", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "unauthorizedAddToCart",
    });
  } else {
    if (cartItems.some((item: cartItem) => item["fid"] === fid)) {
      toast.error("Item already in cart", {
        icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
        toastId: "itemAlreadyInCart",
      });
    } else {
      const data: cartItem = {
        id: Date.now(),
        fid: fid,
        uid: user.uid,
        qty: 1,
      };
      dispatch({
        type: "SET_CARTITEMS",
        cartItems: [...cartItems, data],
      });
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, data]));
      calculateCartTotal(cartItems, foodItems, dispatch);
      await cartService.add(data);
    }
  }
};
export const dispatchtUserCartItems = (
  uid: string,
  items: cartItem[],
  dispatch: any
) => {
  const cartItems = items.filter((item: cartItem) => item.uid === uid);
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });

  return cartItems;
};

export const getFoodImage = (url: string | null | undefined) => {
  if (!url) return "/logo.png"; // Placeholder

  // Fix: Force all local storage uploads to use the correct backend port (8000)
  // This catches http://localhost/..., http://127.0.0.1/..., or relative /storage/...
  if (url.includes("storage/uploads")) {
    const path = url.split("storage/uploads")[1];
    return `http://localhost:8000/storage/uploads${path}`;
  }

  if (url.startsWith("http")) return url;

  const cleanPath = url.startsWith('/') ? url.substring(1) : url;
  return `http://localhost:8000/${cleanPath}`;
};

export const fetchUserCartData = async (user: any, dispatch: any) => {
  if (user) {
    await cartService.getAll()
      .then((data) => {
        // Map backend data to frontend structure `cartItem`
        const mappedData = data.map((item: any) => ({
          ...item,
          fid: item.food_id,
          uid: user.uid,
        }));
        const userCart = dispatchtUserCartItems(user.uid, mappedData, dispatch);
        localStorage.setItem("cartItems", JSON.stringify(userCart));
      })
      .then(() => { })
      .catch((e) => {
        // Handle error silently or dispatch explicit error state
      });
  }
};

export const fetchFoodData = async (dispatch: any) => {
  await foodService.getAll()
    .then((data) => {
      dispatch({
        type: "SET_FOOD_ITEMS",
        foodItems: data,
      });
    })
    .then(() => { })
    .catch((e) => {
      // Handle error
    });
};

export const getFoodyById = (menu: FoodItem[], fid: number) => {
  return menu.find((item: FoodItem) => item.id === fid);
};

//  Update cart item State
export const updateCartItemState = async (
  cartItems: cartItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index] = item;
  }
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });
  await cartService.add(item)
    .then(() => { })
    .catch((e) => {
      // Handle error
    });
};

// Update Cart Item Quantity
export const updateCartItemQty = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any,
  val: number
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    calculateCartTotal(cartItems, foodItems, dispatch);
    await cartService.add(cartItems[index])
      .then(() => { })
      .catch((e) => {
        // Handle error
      });
  }
};

//  Delete Cart Item
export const deleteCartItem = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems.splice(index, 1);
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    calculateCartTotal(cartItems, foodItems, dispatch);
    await cartService.remove(item.id)
      .then(() => { })
      .catch((e) => {
        // Handle error
      });
  }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  let total = 0;
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.price || "0");
  });
  dispatch({
    type: "SET_CART_TOTAL",
    cartTotal: total.toFixed(2),
  });
};

// Empty Cart
export const emptyCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  if (cartItems.length > 0) {
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
    calculateCartTotal(cartItems, foodItems, dispatch);
    await cartService.clear()
      .then(() => { })
      .catch((e) => {
        // Handle error
      });
  } else {
    toast.warn("Cart is already empty");
  }
};

// Hide Cart
export const hideCart = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CART",
    showCart: !true,
  });
};

// Hide Cart
export const hideContactform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CONTACT_FORM",
    showContactForm: !true,
  });
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};

export const logout = async (user: any, dispatch: any, navigate: any) => {
  // Optimistic Logout: Clear local state immediately for UI responsiveness
  dispatch({
    type: "SET_USER",
    user: null,
  });
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: [],
  });
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: false,
  });

  // Fire api call but don't wait for it to block UI, but DO wait to clear localStorage
  // actually, axios interceptor needs localStorage. 
  // So we must fire request, THEN clear localStorage? 
  // But if we want optimistic UI, we can clear Redux (dispatch) but keep localStorage for a split second?
  // Let's just catch the 401 and ignore it, or try to keep token for the request.

  // Better approach:
  authService.logout().catch(err => { }).finally(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminMode");
    localStorage.removeItem("cartItems");
    navigate("/");
  });

  // NOTE: If we want immediate UI update we can navigate first, BUT we kept the Redux clear above.
  // So UI updates immediately (user=null), but localStorage stays for the milliseconds needed for axios.
  // navigate("/"); // Move navigate here if we want instant redirect

};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));

};

export const isAdmin = (user: any) => {
  if (!user) return false;
  // console.log("Checking admin status for:", user); 
  const role = user?.role || user?.user?.role;
  return role === "admin" || role === "Admin";
};

// get user
export const getUserData = async (user: any) => {
  // Mock return since we store user in localstorage
  return [user];
};

// update currentUser

export const updateUserData = async (
  user: any,
  dispatch: any,
  alert: boolean
) => {
  await (authService as any).update(user)
    .then((res: any) => {
      // 1. Get existing token BEFORE we touch localStorage
      const currentUserStr = localStorage.getItem("user");
      const token = currentUserStr ? JSON.parse(currentUserStr).token : null;

      // 2. Update Dispatch
      dispatch({
        type: "SET_USER",
        user: res.user,
      });

      // 3. Construct new object with preserved token
      const newData = { user: res.user, token };

      // 4. Save to localStorage
      localStorage.setItem("user", JSON.stringify(newData));

      alert && toast.success("Profile updated successfully");
    })
    .catch((e: any) => {
      console.error("Profile update error", e);
      toast.error("Failed to update profile");
    });
};

// get all users
export const dispatchUsers = async (dispatch: any) => {
  // Not implemented in backend
  // console.log("dispatchUsers not supported");
}
export const getAllUser = async () => {
  // Not implemented
  return [];
}
// delete food
export const deleteFood = async (
  food: FoodItem,
  foodItems: FoodItem[],
  dispatch: any
) => {
  await foodService.delete(food.id);
  // remove food from foodItems
  const foodIndex = foodItems.indexOf(food);
  if (foodIndex !== -1) {
    foodItems.splice(foodIndex, 1)
  }
  dispatch({
    type: "SET_FOOD_ITEMS",
    foodItems
  })
  toast.success("Food deleted successfully");
};

