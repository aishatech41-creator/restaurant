import { Logo } from "../Assets";
import SidenavMenu from "./SidenavMenu";
import { Link, useNavigate } from "react-router-dom";
import { AiFillLock, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useStateValue } from "../../context/StateProvider";
import { logout, ToggleAdminMode } from "../../utils/functions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Sidenav = ({
  activePage,
  setActivePage,
  setPageContent,
}: {
  activePage: string;
  setActivePage: any;
  setPageContent: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg text-primary cursor-pointer" onClick={() => setIsOpen(true)}>
        <AiOutlineMenu className="text-xl" />
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.div
        className={`fixed md:relative top-0 left-0 h-full w-[280px] md:w-[20%] min-w-[250px] bg-primary/95 backdrop-blur-xl border-r border-white/5 text-headingColor px-4 py-6 flex flex-col justify-center items-center shadow-glass z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="md:hidden absolute top-4 right-4 text-white text-2xl cursor-pointer" onClick={() => setIsOpen(false)}>
          <AiOutlineClose />
        </div>

        <SidenavHeader />
        <SidenavMenu
          activePage={activePage}
          setActivePage={(page: string) => {
            setActivePage(page);
            setIsOpen(false);
          }}
          setPageContent={setPageContent}
        />
        <SidenavFooter />
      </motion.div>
    </>
  );
};

const SidenavHeader = () => {
  const [{ adminMode }, dispatch] = useStateValue();
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      whileHover={{ scale: 1.05 }}
      className="mb-8 w-full"
    >
      <Link
        onClick={() => ToggleAdminMode(dispatch, false)}
        to={"/"}
        className="flex items-center gap-3 w-full justify-center"
      >
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain drop-shadow-md" />
        <p className="text-xl font-serif font-bold text-headingColor tracking-wide">
          Kuka exclusive
        </p>
      </Link>
    </motion.div>
  );
};

const SidenavFooter = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      onClick={() => logout(user, dispatch, navigate)}
      className="flex items-center justify-center mt-auto px-4 py-2 gap-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer transition-all duration-200 w-full"
    >
      <AiFillLock className="font-bold text-xl" />
      <div className="font-semibold">Logout</div>
    </motion.div>
  );
};

export default Sidenav;
