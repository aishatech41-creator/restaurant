import { BiRefresh } from "react-icons/bi";
import { MdLogin, MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import { useStateValue } from "../../context/StateProvider";
import { emptyCart, hideCart } from "../../utils/functions";
import { Link } from "react-router-dom";
const CartHeader = () => {
  const [{ user, cartItems, foodItems }, dispatch] = useStateValue();

  return (
    <div className="w-full flex items-center bg-transparent justify-between px-4 py-4 cursor-pointer">
      <motion.div whileTap={{ scale: 0.8 }} onClick={() => hideCart(dispatch)}>
        <MdOutlineKeyboardBackspace className="text-headingColor text-3xl hover:text-accent transition-colors duration-200" />
      </motion.div>

      <div className="flex items-center justify-center gap-2 text-headingColor font-serif font-bold text-lg">
        Cart
        <MdShoppingBasket className="text-xl cursor-pointer text-accent" />
      </div>

      {user ? (
        <motion.p
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 0.9 }}
          onClick={() => emptyCart(cartItems, foodItems, dispatch)}
          className="flex items-center justify-center gap-2 p-1 px-2 bg-secondary/80 rounded-lg hover:shadow-md text-textColor text-sm backdrop-blur-sm transition-all duration-200"
        >
          Clear <BiRefresh className="text-accent text-lg" />
        </motion.p>
      ) : (
        <Link to={`/login`} onClick={() => hideCart(dispatch)}>
          <motion.p
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 0.9 }}
            className="flex items-center justify-center gap-2 p-1 px-2 bg-secondary/80 rounded-lg hover:shadow-md text-textColor text-sm backdrop-blur-sm transition-all duration-200"
          >
            <MdLogin className="text-accent text-lg" /> Login
          </motion.p>
        </Link>
      )}
    </div>
  );
};

export default CartHeader;
