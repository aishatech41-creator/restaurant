import { Link, useNavigate } from "react-router-dom";
import ProviderAuth, { ImageBox } from ".";
import { toast } from "react-toastify";

// import { motion } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { authService } from "../../services/authService";

// toast.configure()

const Register = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const EmailAuth = () => {
    if (!user) {
      if (email.length > 0 && password.length > 0 && phone.length > 0) {
        toast
          .promise(authService.register({ name: 'User', email, password, phone, password_confirmation: password }), {
            pending: "Creating Account...",
            success: "Account Created",
            error: "Error Creating account, Please try again🤗",
          })
          .then((userData) => {
            // const user = userCred.user;
            // await firebaseAddUser(user);
            dispatch({
              type: "SET_USER",
              user: userData, // Assuming userData contains the user object from Appwrite
            });
            localStorage.setItem("user", JSON.stringify(userData));
            navigate("/");
          }
          ).catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage, { autoClose: 15000 });
          }
          );

      } else {
        toast.warn("Please fill all the fields", { autoClose: 15000 });
      }
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-primary p-4 md:p-10">
      <div className="w-full max-w-6xl h-full flex items-center justify-center gap-10">
        <ImageBox />
        <div className="w-full md:w-[30rem] bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-glass">
          <div className="flex flex-col items-center mb-8">
            <p className="text-3xl font-serif font-bold text-headingColor mb-2">Create Account</p>
            <p className="text-lightGray text-sm">Join us for premium food delivery</p>
          </div>
          <form className="flex flex-col gap-6">
            <ProviderAuth />

            <div className="flex items-center gap-4">
              <div className="h-[1px] bg-white/10 flex-1"></div>
              <p className="text-sm text-lightGray">OR</p>
              <div className="h-[1px] bg-white/10 flex-1"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative group">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-primary border border-white/5 rounded-xl text-headingColor placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative group">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-primary border border-white/5 rounded-xl text-headingColor placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-primary border border-white/5 rounded-xl text-headingColor placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="w-full py-3 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-xl text-white font-bold shadow-lg hover:shadow-orange-500/20 transition-all duration-200"
              onClick={EmailAuth}
            >
              Sign Up
            </motion.button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <p className="text-sm text-lightGray">Already have an account?</p>
              <Link to={"/login"}>
                <span className="text-sm font-bold text-accent hover:text-amber-400 cursor-pointer transition-colors duration-200">
                  Login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
