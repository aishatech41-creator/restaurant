import { useEffect, useState } from "react";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";

const Menu = ({ title }: { title?: string }) => {

  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems }, dispatch] = useStateValue();
  const [filter, setFilter] = useState("all");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalContent(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []); // Close on ESC

  return (
    <section className="w-full my-5" id="menu">
      <div className="w-full flex items-center justify-center">
        <Title title={title || "Our Hot Dishes"} center />
      </div>
      <Filters filter={filter} setFilter={setFilter} />
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={filter === "all" ? foodItems : FilterFood(filter)}
        setPageContent={setModalContent}
      />
      {modalContent && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center overflow-auto p-4 animate-in fade-in duration-200">
          <div className="relative bg-primary p-4 rounded-xl w-full max-w-4xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-50 bg-black/20 p-2 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
