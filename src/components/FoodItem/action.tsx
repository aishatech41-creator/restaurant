import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { motion } from "framer-motion";
import { addToCart, deleteFood } from "../../utils/functions";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { FoodItem } from "../../../types";
import AddFood from "../Admin/AddFood";

const Action = ({ food, admin, setPageContent }: { food: FoodItem; admin?: boolean; setPageContent?: any }) => {
  const [{ cartItems, foodItems, user }, dispatch] = useStateValue();
  return (
    <div className="flex flex-col gap-2">
      {admin ? (
        <div className="flex items-center gap-2">
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer shadow-md hover:shadow-emerald-500/30 transition-all duration-200"
            onClick={() => setPageContent && setPageContent(<AddFood data={food} />)}
            title="Edit"
          >
            <BiEditAlt className="text-white text-lg md:text-xl" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 flex items-center justify-center cursor-pointer shadow-md hover:shadow-red-500/30 transition-all duration-200"
            onClick={() => deleteFood(food, foodItems, dispatch)}
            title="Delete"
          >
            <MdDeleteForever className="text-white text-lg md:text-xl" />
          </motion.div>
        </div>
      ) : (
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full bg-accent flex items-center justify-center cursor-pointer shadow-lg hover:shadow-orange-500/40 transition-all duration-200"
          onClick={() => addToCart(cartItems, foodItems, user, food.id, dispatch)}
          title="Add to cart"
        >
          <MdAddShoppingCart className="text-white text-xl" />
        </motion.div>
      )}
    </div>
  );
};

export default Action;
