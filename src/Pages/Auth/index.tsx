import "react-toastify/dist/ReactToastify.css";

import { Cheff1 } from "../../components/Assets";
// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
// } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

import { MdOutlineNotificationsActive } from "react-icons/md";


const ProviderAuth = () => {
  /*
  const GOOGLE_PROVIDER = new GoogleAuthProvider();
  const GITHUB_PROVIDER = new GithubAuthProvider();
  */
  const [dispatch] = useStateValue();
  /* const navigate = useNavigate(); */

  const showNotSupported = (provider: string) => {
    toast.warn(`${provider} Signin is not available yet`, {
      autoClose: 2000,
      icon: (
        <MdOutlineNotificationsActive className="text-accent text-xl" />
      ),
      toastId: provider.toLowerCase(),
    });
  };
  return (
    <div className="flex items-center justify-center gap-4 text-center">
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="flex items-center justify-center gap-2 w-full py-3 bg-primary border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200"
        onClick={() =>
          toast.warn("GitHub Signin is not available yet", {
            autoClose: 2000,
            icon: (
              <MdOutlineNotificationsActive className="text-accent text-xl" />
            ),
            toastId: "github",
          })
        }
      >
        <BsGithub className="text-xl text-headingColor" />
        <span className="text-sm font-semibold text-headingColor">Github</span>
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="flex items-center justify-center gap-2 w-full py-3 bg-primary border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200"
        onClick={() => showNotSupported("Google")}
      >
        <FcGoogle className="text-xl" />
        <span className="text-sm font-semibold text-headingColor">Google</span>
      </motion.div>
    </div>
  );
};

export const ImageBox = () => {
  return (
    <div className="hidden md:w-8/12 lg:w-6/12 mb-12 md:mb-0 md:flex ">
      <motion.img
        whileHover={
          {
            rotate: [0, -10, 10, -10, 0],
            // duration: 0.5,
          }
        }
        src={Cheff1}
        className="w-96 cursor-pointer"
        alt="logo-login"
      />
    </div>
  );
};

export default ProviderAuth;
