import { motion } from "framer-motion";
import { Categories } from "../../../utils/categories"
const CategoryCards = () => {
  let category = Categories[Math.floor(Math.random() * Categories.length)];
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-secondary/40 backdrop-blur-md border border-white/5 min-h-[10rem] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-glass cursor-pointer group hover:bg-secondary/60 transition-all duration-200"
    >
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-inner group-hover:bg-accent group-hover:text-primary transition-colors duration-200 text-3xl text-accent">
        {category.icon}
      </div>
      <p className="text-xl font-bold text-headingColor group-hover:text-accent transition-colors duration-200">
        {category.name}
      </p>
    </motion.div>
  )
}

export default CategoryCards