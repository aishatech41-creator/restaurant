import { FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { ToggleAdminMode } from "../../utils/functions";

const Content = ({ pageTitle, Element }: { pageTitle: string, Element: JSX.Element }) => {
  const [{ }, dispatch] = useStateValue();
  return (
    <div className="flex flex-col w-full md:w-[80%] h-screen bg-primary">
      <div className="flex justify-between items-center w-full pl-20 pr-8 md:px-8 py-6 border-b border-white/5 bg-secondary/30 backdrop-blur-md">
        <p className="text-2xl font-serif font-bold text-headingColor tracking-wide capitalize">
          {pageTitle}
        </p>

        {/* home button */}
        <Link to="/" onClick={() => ToggleAdminMode(dispatch, false)}>
          <button className="flex items-center justify-center gap-2 text-accent hover:text-white border border-accent hover:bg-accent/10 px-4 py-2 rounded-lg transition-all duration-200 font-semibold group">
            <FaShopify className="group-hover:rotate-12 transition-transform duration-200" />
            Store
          </button>
        </Link>
      </div>
      <div className="flex-1 p-6 overflow-y-scroll scrollbar-hidden">
        <div className="w-full h-full bg-secondary/20 rounded-2xl border border-white/5 p-6 shadow-inner">
          {Element}
        </div>
      </div>

    </div>
  );
};
export default Content;