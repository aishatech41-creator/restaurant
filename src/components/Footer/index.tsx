import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

import { Link } from "react-router-dom";
import { Logo } from "../Assets";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="p-8 bg-primary w-full border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-7xl mx-auto">

        {/* Brand Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex gap-2 items-center">
            <img src={Logo} className="w-12 object-contain" alt="Logo" />
            <span className="text-2xl font-bold font-serif text-headingColor tracking-wide">
              Kuka exclusive
            </span>
          </Link>
          <p className="text-lightGray text-sm leading-relaxed">
            Experience the finest dining with our premium collection of cuisines.
            Fresh ingredients, masterfully crafted for your delight.
          </p>
          <div className="flex gap-4 mt-4">
            {[BsGithub, BsLinkedin, BsTwitter, BsInstagram, BsFacebook, BsDribbble].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1, color: "#f59e0b" }}
                href="#"
                className="text-textColor text-xl transition-colors duration-200"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-serif text-headingColor font-bold">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {["Home", "Menu", "Services", "About Us"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                  className="text-lightGray hover:text-accent transition-colors duration-200 text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-serif text-headingColor font-bold">Newsletter</h3>
          <p className="text-lightGray text-sm">Subscribe to get special offers and updates.</p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-secondary text-headingColor placeholder-gray-500 px-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-accent transition-colors duration-200"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-primary font-bold py-2 rounded-lg hover:bg-amber-400 transition-colors duration-200"
            >
              Subscribe
            </motion.button>
          </div>
        </div>

      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-transparent">
        <span className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Kuka exclusive™. All Rights Reserved.
        </span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="#" className="text-xs text-gray-500 hover:text-lightGray">Privacy Policy</Link>
          <Link to="#" className="text-xs text-gray-500 hover:text-lightGray">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
