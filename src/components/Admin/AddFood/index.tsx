import { AssetUploader, Loader } from "../..";
import { BiCategory, BiFoodMenu } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdOutlineDataSaverOn,
  MdOutlineFastfood,
  MdOutlineFoodBank,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";

import { foodService } from "../../../services/foodService";
import { toast } from "react-toastify";

import { Categories } from "../../../utils/categories";
import CategoriesSelector from "./CategoriesSelector";
import { GiTakeMyMoney } from "react-icons/gi";
import { motion } from "framer-motion";
// import { toast } from "react-toastify";
import { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { fetchFoodData } from "../../../utils/functions";

import { FoodItem } from "../../../../types";

const AddFood = ({ data }: { data?: FoodItem }) => {
  const [title, setTitle] = useState(data ? data.title : "");
  const [calories, setCalories] = useState(data ? data.calories : "");
  const [price, setPrice] = useState(data ? data.price : "");
  const [image, setImage] = useState<any>(data ? data.imageURL : null);
  const [category, setCategory] = useState(data ? data.category : "");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(data ? data.qty : "");
  const [description, setDescription] = useState(data ? data.description : "");
  const [loaderMessage, setLoadermessage] = useState("");
  const [{ foodItems }, dispatch] = useStateValue();

  const deleteImage = () => {
    setLoadermessage("Removing Photo......");

    toast.warn("Image deletion not supported");
    setImage(null);
    setLoading(false);
  };
  const saveItem = () => {
    setLoadermessage(`Saving Product ${title}.`);
    setLoading(true);
    try {
      if (!title || !calories || !price || !image || !category) {
        console.log("Validation failed:", { title, calories, price, image, category });
        toast.error("Please fill all fields before saving product 🤗");
        setLoading(false);
        return;
      } else {
        const foodData: any = {
          id: data ? data.id : Date.now(),
          title: title,
          calories: calories,
          category: category,
          description: description,
          price: price,
          imageURL: image,
          qty: quantity,
        };

        const apiCall = data
          ? foodService.update(data.id, foodData)
          : foodService.save(foodData);

        toast
          .promise(apiCall, {
            pending: data ? "Updating Product..." : "Saving Product...",
            success: data ? "Product updated successfully" : "Product saved successfully",
            error: data ? "Error updating product" : "Error saving product",
          })
          .then(() => {
            if (!data) clearForm(); // Only clear form on create, or maybe both? usually keep form on edit or close it. 
            // For now, let's behave like a save and possibly close or specific behavior. 
            // The user didn't specify, but clearing form on edit might be annoying if they want to make more changes, 
            // BUT usually edit closes the modal or view. The view switching is handled by parent, 
            // so clearing form is okay if we expect navigation away, but we don't control navigation here.
            // Let's clear form if it's a create. If edit, keep values?
            // Actually, if we clear form on edit, the UI will empty out while still looking at the "Edit" page. 
            // Let's start by clearing only on create.
            if (!data) clearForm();
            setLoading(false);
            fetchFoodData(dispatch);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoadermessage("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error whilesaving product");
    }
  };
  const clearForm = () => {
    setTitle("");
    setCalories("");
    setPrice("");
    setImage(null);
    // setCategory("");
    setQuantity("");
    setDescription("");
  };

  const validateNumber = (value: any) => {
    if (isNaN(value)) {
      toast.error("Please enter a valid number", { toastId: 123 });
      return "";
    }
    return value;
  };



  return (
    <div className="w-full h-fullflex items-center justify-center">
      <div className="border w-full  flex border-gray-300 items-center rounded-lg p-4 flex-col justify-center gap-4  ">
        <div className="w-full py-3 border-b border-gray-300 flex -tems-center gap-2">
          <MdOutlineFastfood className="text-xl text-gray-600" />
          <input
            type="text"
            required
            placeholder="Enter food name"
            autoFocus
            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <BiCategory className="text-xl text-gray-600" />
            <CategoriesSelector
              categories={Categories}
              action={setCategory}
              selected={category}
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineProductionQuantityLimits className="text-gray-600 text-2xl" />
            <input
              type="text"
              required
              placeholder="Quantity"
              autoFocus
              className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
              value={quantity}
              onChange={(e) => setQuantity(validateNumber(e.target.value))}
            />
          </div>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[225px]  md:h-[420px] round-lg">
          {loading ? (
            <Loader progress={loaderMessage} />
          ) : (
            <>
              {image ? (
                <>
                  <div className="relative h-full">
                    <img
                      src={image}
                      alt="uploaded food"
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      whileHover={{ scale: 1.2 }}
                      title="Remove Photo"
                      className="absolute bottom-3 right-3 rounded-full p-2 md:p-5 bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImage()}
                    >
                      <MdDeleteOutline className="text-white" />
                    </motion.button>
                  </div>
                </>
              ) : (
                <AssetUploader
                  action={setImage}
                  progressHandler={setLoadermessage}
                  promise={setLoading}
                />
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineFoodBank className="text-gray-600 text-2xl" />
            <input
              type="text"
              required
              placeholder="Calories"
              autoFocus
              className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <GiTakeMyMoney className="text-gray-600 text-2xl" />
            <input
              type="text"
              required
              placeholder="Price"
              autoFocus
              className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
              value={price}
              onChange={(e) => setPrice(validateNumber(e.target.value))}
            />
          </div>
        </div>
        <div className="w-full py-3 border-b border-gray-300 flex -tems-center gap-2">
          <BiFoodMenu className="text-xl text-gray-600" />
          <input
            type="text"
            required
            placeholder="Short Description"
            autoFocus
            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="ml-0 flex justify-center items-center gap-2 flex-row-reverse md:ml-auto w-full md:w-auto border-none outline-none rounded bg-orange-500 px-12 py-2 text-lg text-white"
            onClick={() => saveItem()}
          >
            <MdOutlineDataSaverOn /> Save
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
