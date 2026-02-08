import { BiMinus, BiPlus } from "react-icons/bi";

import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { cartItem } from "../../../types";
import { deleteCartItem, getFoodyById, updateCartItemQty, getFoodImage } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

const CartItem = ({ item }: { item: cartItem }) => {
  const [{ foodItems, cartItems }, dispatch] = useStateValue();
  const { fid, qty } = item;
  const foodItem = getFoodyById(foodItems, fid);

  return (
    <div className="w-full p-2 px-3 rounded-xl bg-secondary/60 backdrop-blur-md border border-white/5 flex items-center justify-between gap-2 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3">
        <img
          src={getFoodImage(foodItem?.imageURL)}
          alt=""
          className="w-16 h-16 max-w-[60px] rounded-full object-contain drop-shadow-md"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-headingColor">{foodItem?.title}</p>
          <p className="text-xs text-lightGray font-medium">
            <span className="text-xs text-accent">₦</span> {parseFloat(foodItem?.price || "0") * qty}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-primary rounded-lg p-1">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-6 h-6 rounded flex items-center justify-center cursor-pointer hover:bg-white/10 text-lightGray"
            onClick={qty > 1 ? () => updateCartItemQty(cartItems, foodItems, item, dispatch, -1) : () => { }}
          >
            <BiMinus className="text-sm" />
          </motion.div>
          <p className="text-xs font-semibold text-white w-4 flex justify-center">
            {qty}
          </p>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-6 h-6 rounded flex items-center justify-center cursor-pointer hover:bg-white/10 text-lightGray"
            onClick={() => updateCartItemQty(cartItems, foodItems, item, dispatch, 1)}
          >
            <BiPlus className="text-sm" />
          </motion.div>
        </div>

        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center cursor-pointer hover:bg-red-500/20 text-red-500 transition-colors duration-200"
          onClick={() => deleteCartItem(cartItems, foodItems, item, dispatch)}
        >
          <MdDelete className="text-lg" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
