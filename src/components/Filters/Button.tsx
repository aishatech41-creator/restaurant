import { motion } from "framer-motion";
import { MdOutlineFastfood } from "react-icons/md";
import { FoodCategory } from "../../../types";
const Button = ({
  category,
  filter,
  setFilter,
}: {
  category: FoodCategory;
  filter: string;
  setFilter: any;
}) => {
  return (
    <motion.div
      onClick={() => setFilter(category.urlParam)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -5 }}
      className={`group ${category.urlParam === filter
          ? "bg-accent shadow-lg shadow-orange-500/30"
          : "bg-secondary hover:bg-white/5 border border-white/5"
        } w-24 min-w-[6rem] h-28 cursor-pointer rounded-2xl drop-shadow-lg flex flex-col gap-4 items-center justify-center transition-all duration-200`}
    >
      <div
        className={`w-12 h-12 rounded-full ${category.urlParam === filter
            ? "bg-primary text-headingColor"
            : "bg-cartNumBg/20 text-headingColor group-hover:bg-accent group-hover:text-primary transition-colors duration-200"
          }  flex items-center justify-center shadow-inner`}
      >
        <span className="text-2xl">
          {category.icon || <MdOutlineFastfood />}
        </span>
      </div>
      <p
        className={`text-sm font-semibold ${category.urlParam === filter
            ? "text-primary"
            : "text-lightGray group-hover:text-headingColor"
          } transition-colors duration-200`}
      >
        {category.name}
      </p>
    </motion.div>
  );
};

export default Button;
