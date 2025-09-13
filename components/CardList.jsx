"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CardList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const formatPrice = (price) => {
    return price ? new Intl.NumberFormat("fa-IR").format(price) : "";
  };

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        هنوز هیچ محصولی اضافه نشده است.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {products.map((product, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-white dark:bg-gray-950 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300"
        >
          <div className="relative w-full h-60">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                تصویر محصول
              </div>
            )}
          </div>

          <div className="p-5 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate">
              {product.name || "نام محصول"}
            </h3>

            <p className="text-green-600 font-semibold text-lg">
              {product.price ? `${formatPrice(product.price)} تومان` : "قیمت"}
            </p>

            <p className="text-blue-500 font-medium">
              {product.category || "دسته‌بندی"}
            </p>

            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
              {product.description || "توضیحات محصول اینجا نمایش داده می‌شود."}
            </p>
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-center gap-3">
            <button className="px-4 py-2 bg-[#bbdce5] text-[#ab886d] rounded-xl shadow-lg cursor-pointer hover:bg-[#bbdce5] transition w-4/5">
              جزئیات
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
