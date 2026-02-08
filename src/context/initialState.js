import { fetchSessionUser, fetchSessionUserMode, fetchSessionCart } from "../utils/fetchSessionData";

const sessionUser = fetchSessionUser();
const sessionUserMode = fetchSessionUserMode();
const sessionCart = fetchSessionCart()
export const initialState = {
    user: sessionUser,
    foodItems: null,
    showCart: false,
    showContactForm: false,
    cartItems: sessionCart,
    cartTotal: 0,
    adminMode: sessionUserMode,
    users: [],
    paymentMethod: 'mobile_money',
    checkoutData: {},
}