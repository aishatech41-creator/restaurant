import { Avatar, Logo } from "../Assets";
import { Link } from "react-router-dom";

import DropDown from "./DropDown";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import LoginAction from "./LoginAction";
import MobileNav from "./mobile-nav";
import Navigations from "./Navigations";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";

const Header = () => {
  const [{ user }] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

  return (
    <header className="fixed w-full z-50 p-3 px-4 lg:p-6 lg:px-16 bg-primary/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      {/* Tablet and Desktop */}
      <div className="hidden md:flex w-full justify-between items-center max-w-7xl mx-auto">
        <Link to={"/"}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={Logo} alt="Logo" className="w-10 object-contain" />
            <p className="text-headingColor text-xl font-bold font-serif tracking-wide">
              Kuka exclusive
            </p>
          </motion.div>
        </Link>

        {/* navigation */}
        <Navigations />

        {/* User */}
        {user ? (
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={user.photoURL || user.photo_url || Avatar}
                className="w-10 h-10 rounded-full object-cover border-2 border-accent/20"
                alt="profile"
              />
              <RiArrowDropDownLine className="text-headingColor text-xl" />
            </motion.div>
            {isOpen && <DropDown user={user} />}
          </div>
        ) : (
          <LoginAction text={"Login"} />
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden w-full items-center justify-between">
        <AnimatePresence>
          {isOpenMobileNav && <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav} />}
        </AnimatePresence>

        {!isOpenMobileNav && (
          <>
            <Link to={"/"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={Logo} alt="Logo" className="w-8 object-contain" />
                <p className="text-headingColor text-lg font-bold font-serif">
                  Kuka exclusive
                </p>
              </motion.div>
            </Link>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <motion.img
                    whileTap={{ scale: 0.9 }}
                    src={user.photoURL || user.photo_url || Avatar}
                    className="w-9 h-9 rounded-full object-cover border border-accent/30"
                    alt="user-profile"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  {isOpen && <DropDown user={user} />}
                </div>
              ) : (
                <LoginAction mobile />
              )}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="text-headingColor text-3xl cursor-pointer"
                onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
              >
                <HiOutlineMenuAlt2 />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
