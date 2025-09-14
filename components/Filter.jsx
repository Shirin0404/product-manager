"use client";

import { useState, useEffect } from "react";

export default function ProductFilter({
  categories = [],
  onFilter,
  initialFilters,
}) {
  const [category, setCategory] = useState(initialFilters.category || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");

  useEffect(() => {
    onFilter({ category, minPrice, maxPrice });
  }, [category, minPrice, maxPrice]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          دسته‌بندی
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          <option value="">همه دسته‌بندی‌ها</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          قیمت حداقل
        </label>
        <input
          type="number"
          placeholder=" 10000"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          قیمت حداکثر
        </label>
        <input
          type="number"
          placeholder=" 100000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        />
      </div>
    </div>
  );
}
