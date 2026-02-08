import { motion } from "framer-motion";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { isAdmin, logout, ToggleAdminMode } from "../../utils/functions";

const DropDown = ({ user }: { user: any; }) => {
  const navigate = useNavigate();
  const [{ }, dispatch] = useStateValue();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col absolute right-0 top-14 w-60 bg-white shadow-2xl rounded-xl overflow-hidden z-50 border border-gray-100"
    >
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <p className="text-xs text-gray-500 font-medium mb-1">Signed in as</p>
        <p className="text-sm font-bold text-gray-800 truncate" title={user?.name || user?.displayName || user?.email}>
          {user?.name || user?.displayName || user?.email}
        </p>
      </div>

      <div className="py-2">
        {isAdmin(user) && (
          <Link
            className="w-full px-5 py-2.5 flex items-center gap-3 text-gray-600 hover:text-headingColor hover:bg-gray-50 transition-all duration-200"
            to={"/admin"}
            onClick={() => ToggleAdminMode(dispatch, true)}
          >
            <RiAdminLine className="text-lg" />
            <span className="text-sm font-medium">Administrator</span>
          </Link>
        )}

        <Link
          to={'/profile'}
          className="w-full px-5 py-2.5 flex items-center gap-3 text-gray-600 hover:text-headingColor hover:bg-gray-50 transition-all duration-200"
        >
          <FaUserCog className="text-lg" />
          <span className="text-sm font-medium">Profile</span>
        </Link>

        <div className="h-px bg-gray-100 my-1 mx-2" />

        <button
          className="w-full px-5 py-2.5 flex items-center gap-3 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          onClick={() => logout(user, dispatch, navigate)}
        >
          <MdLogout className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default DropDown;
