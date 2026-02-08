import { AiFillDashboard } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import {
  MdAddModerator,
  MdOutlineFavoriteBorder,
  MdRestaurantMenu,
} from "react-icons/md";
import { motion } from "framer-motion";
import { FaCogs } from "react-icons/fa";
import AddFood from "./AddFood";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Menu from "./Menu";
import Orders from "./Orders";
import { useStateValue } from "../../context/StateProvider";

const SidenavMenu = ({
  activePage,
  setActivePage,
  setPageContent,
}: {
  activePage: string;
  setActivePage: any;
  setPageContent: any;
}) => (
  <motion.nav
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -200 }}
    className="space-y-4 w-full "
  >
    <NavItem
      activePage={activePage}
      svgIcon={<AiFillDashboard />}
      title="Dashboard"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<Dashboard />}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdAddModerator />}
      title="Add Food"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<AddFood />}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdRestaurantMenu />}
      title="Menu"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<Menu setPageContent={setPageContent} />}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdOutlineFavoriteBorder />}
      title="Orders"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<Orders />}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<FiUsers />}
      title="Users"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<Users />}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<FaCogs />}
      title="Settings"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={
        <div className="w-full flex tems-center justify-center">Settings</div>
      }
    />
  </motion.nav>
);

const NavItem = ({
  activePage,
  svgIcon,
  title,
  setActivePage,
  setPageContent,
  pageContent,
}: {
  activePage: string;
  setActivePage: any;
  svgIcon: any;
  title: string;
  setPageContent: any;
  pageContent: JSX.Element;
}) => {
  const handleClick = () => {
    setActivePage(title);
    setPageContent(pageContent);
  };
  const [{ users, foodItems }, dispatch] = useStateValue()
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className={`flex items-center no-underline gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${activePage === title ? "bg-accent/20 border-l-4 border-accent" : "hover:bg-white/5 border-l-4 border-transparent"
        }`}
    >
      <div className={`p-2 rounded-lg ${activePage === title ? "bg-accent text-primary" : "bg-primary text-lightGray group-hover:text-headingColor"}`}>
        <p className="font-bold text-xl">{svgIcon}</p>
      </div>

      <div className="flex items-center justify-between flex-1 font-semibold text-headingColor">
        {title}
        {
          (title === "Menu" || title === "Users") && (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activePage === title ? "bg-primary text-accent" : "bg-white/10 text-lightGray"}`}>
              <p className="text-xs font-bold">
                {
                  title === "Menu" ? foodItems?.length : users?.length
                }
              </p>
            </div>
          )
        }
      </div>
    </motion.div>
  );
};
export default SidenavMenu;
