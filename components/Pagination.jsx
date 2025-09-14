"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ items, onPageChange }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = items.slice(start, end);

    onPageChange(currentItems);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage);
    router.replace(`?${params.toString()}`);
  }, [currentPage, itemsPerPage, items]);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md">
        <label className="font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
          تعداد در هر صفحه:
        </label>

        <div className="relative">
          <select
            className="appearance-none border rounded-lg px-4 py-2 pr-8 bg-gray-50 dark:bg-gray-700 
                 text-gray-700 dark:text-gray-200 font-medium cursor-pointer shadow-sm 
                 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

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
