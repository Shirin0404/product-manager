"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, placeholder = "جستجو..." }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="flex my-7 items-center w-full max-w-md mx-auto bg-white dark:bg-gray-800 border rounded-lg shadow-sm px-3 py-2 gap-2">
      <Search className="w-5 h-5 text-gray-500 dark:text-gray-300" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
      />
    </div>
  );
}
