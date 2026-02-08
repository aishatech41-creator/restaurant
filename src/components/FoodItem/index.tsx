import { FoodItem } from "../../../types";
import { motion } from "framer-motion";
import Action from "./action";
import { getFoodImage } from "../../utils/functions";
import { useState } from "react";
import { NotFoundImg } from "../Assets"; // Fallback imports if needed, but using helper primarily

export const SingleFoodItem = ({
  item,
  col,
  admin,
  setPageContent,
}: {
  item: FoodItem;
  col?: boolean;
  admin?: boolean;
  setPageContent?: any;
}) => {
  const { id, title, price, calories, imageURL, description } = item;
  const [imgSrc, setImgSrc] = useState(getFoodImage(imageURL));

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${!col ? "w-[280px] min-w-[280px]" : "w-[300px] min-w-[300px]"
        } md:w-[320px] md:min-w-[320px] ${col ? "my-8" : "my-4 md:my-8"
        } bg-containerbg/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-between shadow-glass hover:shadow-2xl transition-all duration-300 relative group overflow-visible`}
    >
      <div className="w-full flex items-center justify-center relative -mt-16">
        <motion.img
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl z-10"
          alt={description}
          src={imgSrc}
          loading="lazy"
          onError={() => setImgSrc(NotFoundImg)}
        />
      </div>

      <div className="w-full flex flex-col items-end justify-end mt-4">
        <div className="w-full flex flex-col items-start">
          <p className="text-headingColor font-serif font-bold text-xl tracking-wide truncate w-full">{title}</p>
          <p className="mt-1 text-sm text-lightGray truncate w-full">{description}</p>
          <p className="mt-1 text-xs text-textColor">{calories} calories</p>
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <p className="text-xl text-headingColor font-bold">
            <span className="text-sm text-accent">₦</span> {price}
          </p>
          <Action food={item} admin={admin} setPageContent={setPageContent} />
        </div>
      </div>
    </motion.div>
  );
};
