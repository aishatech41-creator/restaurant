// import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

const Navigations = ({ direction }: { direction?: string }) => {
  const [{ showContactForm, cartItems }, dispatch] = useStateValue();
  const location = useLocation();

  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: true,
    });
  };
  const handleToggleContact = () => {
    dispatch({
      type: "TOGGLE_CONTACT_FORM",
      showContactForm: !showContactForm,
    });
  }

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `text-base font-medium cursor-pointer transition-colors duration-200 ${isActive(path) ? "text-accent" : "text-lightGray hover:text-headingColor"
    }`;

  return (
    <div className="flex items-center gap-8">
      <motion.ul
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className={`flex items-center gap-8 ${direction && direction}`}
      >
        {["/", "/menu", "/services", "/about"].map((path, index) => (
          <motion.li
            key={index}
            whileHover={{ y: -2 }}
            className={linkClass(path)}
          >
            <Link to={path}>
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          </motion.li>
        ))}

        <motion.li
          whileHover={{ y: -2 }}
          className="text-base font-medium text-lightGray cursor-pointer hover:text-headingColor transition-colors duration-200"
          onClick={handleToggleContact}
        >
          Contact us
        </motion.li>
      </motion.ul>

      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="relative flex items-center justify-center text-headingColor hover:text-accent transition-colors duration-200"
        onClick={handleToggleCart}
      >
        <MdShoppingBasket className="text-2xl cursor-pointer" />
        {cartItems && cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center cursor-pointer shadow-md">
            <p className="text-xs text-white font-semibold">
              {cartItems.length}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Navigations;
