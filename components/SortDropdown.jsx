"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SortDropdown({ options = [], initial = "", onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initial);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className="relative w-52 my-9">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <span>{selected ? options.find((o) => o.value === selected)?.label : "مرتب‌سازی"}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="inline-block ml-2 transition-transform"
        >
          ▼
        </motion.span>
      </button>

      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {option.label}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
