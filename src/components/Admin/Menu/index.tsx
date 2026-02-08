import { FaSearch } from "react-icons/fa";
import { FoodItem } from "../../../../types";
import { SingleFoodItem } from "../../FoodItem";
import React, { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";

const Menu = ({ setPageContent }: { setPageContent?: any }) => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [query, setQuery] = useState("");
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>(foodItems);

  const filterFood = () => {
    if (query.length === 0) {
      setFilteredFoodItems(foodItems);
    } else {
      const filteredFoodItems = foodItems?.filter((foodItem: FoodItem) => foodItem.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredFoodItems(filteredFoodItems);
    }
  }
  const searchFood = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    filterFood();
  }
  return (
    <div className="w-full flex flex-col justify-center gap-4">
      {/* search bar */}
      <div className="w-full flex justify-center items-center p-2 bg-secondary/40 border border-white/5 backdrop-blur-md rounded-xl shadow-sm">
        <input
          className="w-full p-2 bg-transparent text-headingColor placeholder-gray-500 outline-none"
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => searchFood(e)}
        />
        {/* search button */}
        <button className="flex items-center justify-center p-2 text-lightGray hover:text-accent transition-colors duration-200">
          <FaSearch />
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-6 overflow-x-hidden flex-wrap py-4">
        {
          filteredFoodItems?.map((item: FoodItem) => (
            <SingleFoodItem key={item.id} item={item} col admin setPageContent={setPageContent} />
          ))
        }
      </div>
    </div>
  );
};

export default Menu;
