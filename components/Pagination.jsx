"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  items,
  currentPage,
  onPageChange,
  itemsPerPage,
}) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <motion.button
          key={i}
          onClick={() => handlePageClick(i)}
          whileTap={{ scale: 0.9 }}
          className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg transition-all shadow-sm
            ${
              currentPage === i
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            }`}
        >
          {i}
        </motion.button>
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mt-8">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <motion.button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer p-2 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </motion.button>

        {renderPageNumbers()}

        <motion.button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer p-2 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </motion.button>
      </div>
    </div>
  );
}
