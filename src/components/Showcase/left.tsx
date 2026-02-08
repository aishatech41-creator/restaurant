import React from "react";
import { BikeDelivery } from "../Assets";
import { motion } from "framer-motion";
const Left = () => {
  return (
    <div className="flex-1 flex flex-col items-start justify-center gap-6">
      <div className="flex items-center gap-2 justify-center bg-orange-100/20 backdrop-blur-md px-4 py-1 rounded-full border border-orange-500/10">
        <p className="text-base text-accent font-bold">Bike Delivery</p>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/90 drop-shadow-xl p-1">
          <img
            src={BikeDelivery}
            alt="delivery"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-tight text-headingColor font-serif leading-tight">
        The Fastest Food Delivery in
        <span className="text-accent text-[3rem] lg:text-[5rem] block md:inline md:pl-4">Abuja</span>
      </p>

      <p className="text-base text-lightGray text-center md:text-left md:w-[80%] leading-relaxed font-sans">
        Experience culinary excellence delivered to your doorstep. We partner with the finest restaurants to bring you premium flavors, handled with care and delivered with speed.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-accent text-primary text-lg font-bold w-full md:w-auto px-8 py-3 rounded-xl shadow-premium hover:shadow-orange-500/20 transition-all duration-200"
      >
        Order Now
      </motion.button>
    </div>
  );
};

export default Left;
