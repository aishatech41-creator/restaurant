// import React from 'react'
import { MdOutlineRestaurantMenu, MdShoppingBasket } from "react-icons/md";

import { Link } from "react-router-dom";
import { Logo } from "../Assets";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

const MobileNav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [{ showContactForm, showCart, cartItems }, dispatch] = useStateValue();
  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: !showCart,
    });
  };
  const handleToggleContact = () => {
    dispatch({
      type: "TOGGLE_CONTACT_FORM",
      showContactForm: !showContactForm,
    });
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full h-screen z-[100] bg-primary/95 backdrop-blur-xl flex flex-col justify-between"
    >
      <div className="w-full flex items-center justify-between p-4 px-6 md:p-6 md:px-16 relative">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center text-headingColor cursor-pointer"
          onClick={handleToggleCart}
        >
          <MdShoppingBasket className="text-3xl" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center shadow-lg">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: 90 }}
          className="relative flex items-center justify-center text-headingColor cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineRestaurantMenu className="text-3xl" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 h-full">
        {["Home", "Menu", "Services", "About"].map((item, index) => (
          <Link
            key={index}
            onClick={() => setIsOpen(!isOpen)}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="text-2xl font-serif font-medium text-headingColor hover:text-accent transition-colors duration-200"
          >
            {item}
          </Link>
        ))}
        <p
          onClick={() => {
            setIsOpen(!isOpen);
            handleToggleContact();
          }}
          className="text-2xl font-serif font-medium text-headingColor hover:text-accent transition-colors duration-200 cursor-pointer"
        >
          Contact
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-white font-bold shadow-lg"
        >
          Login
        </motion.button>
      </div>

      <div className="w-full p-8 flex justify-center items-center bg-transparent">
        <Link
          to={"/"}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <img src={Logo} alt="Logo" className="w-10 object-contain" />
          <p className="text-headingColor text-lg font-bold font-serif">Kuka exclusive</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default MobileNav;
