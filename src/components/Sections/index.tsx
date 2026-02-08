import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { motion } from 'framer-motion';

export const Title = ({ title, center }: { title: string, center?: boolean }) => {
  return (
    <div className={`flex flex-col ${center ? "items-center" : "items-start"}`}>
      <p className={`text-3xl font-serif font-bold text-headingColor tracking-wide capitalize relative`}>
        {title}
      </p>
      <div className={`w-24 h-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 mt-2`}></div>
    </div>
  );
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center mt-8">
      <ul className="flex justify-center gap-2">
        {pages.map((page) => {
          return (
            <li
              key={page}
              className={`rounded-lg overflow-hidden ${currentPage === page ? "bg-accent shadow-md" : "bg-transparent hover:bg-white/5"
                } transition-all duration-200`}
            >
              <button
                className={`px-4 py-2 text-sm font-medium ${currentPage === page ? "text-primary" : "text-lightGray"}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const PrevNext = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
        onClick={onPrev}
        className="w-10 h-10 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-200 ease-in-out shadow-lg hover:shadow-orange-500/30"
      >
        <MdChevronLeft className="text-2xl text-white" />
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
        onClick={onNext}
        className="w-10 h-10 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-200 ease-in-out shadow-lg hover:shadow-orange-500/30"
      >
        <MdChevronRight className="text-2xl text-white" />
      </motion.div>
    </div>
  );
};

