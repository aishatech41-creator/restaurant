import React from "react";
import { motion } from "framer-motion";
import { foodItemsStatic } from "../../../types";

const StaticsImages: React.FC<foodItemsStatic> = ({ items }) => {
  return (
    <div className="w-full h-full absolute flex items-center justify-center top-6 left-0 lg:px-30 lg:py-4 gap-6 flex-wrap">
      {items.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={index}
          className="cursor-pointer min-h-[160px] lg:min-h-[220px] min-w-[160px] lg:min-w-[210px] p-4 bg-secondary/80 backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col items-center justify-center shadow-glass hover:shadow-2xl transition-all duration-300"
        >
          <motion.img
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            src={item.imgSrc}
            alt="icecream"
            className="w-28 lg:w-44 -mt-12 lg:-mt-24 drop-shadow-2xl"
          />
          <p className="text-lg lg:text-xl font-bold text-headingColor mt-4">{item.title}</p>
          <p className="text-xs lg:text-sm text-lightGray font-medium my-2 text-center px-2">
            {item.desc}
          </p>
          <p className="text-lg font-bold text-headingColor">
            <span className="text-xs text-accent">₦</span> {item.price}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StaticsImages;
