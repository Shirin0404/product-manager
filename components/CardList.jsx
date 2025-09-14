"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SearchBar from "@/components/Search";
import Pagination from "@/components/Pagination";
import Image from "next/image";

export default function CardList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceTimeout = useRef(null);

  const initialQuery = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const itemsPerPage = 10;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const filtered = initialQuery
      ? storedProducts.filter((product) =>
          product.name.toLowerCase().includes(initialQuery.toLowerCase())
        )
      : storedProducts;

    setFilteredProducts(filtered);
  }, [initialQuery]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentItems(filteredProducts.slice(start, end));
  }, [filteredProducts, currentPage]);

  const formatPrice = (price) =>
    price ? new Intl.NumberFormat("fa-IR").format(price) : "";

  const handleSearch = (value) => {
    setQuery(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);

      const params = new URLSearchParams(window.location.search);
      if (value) params.set("search", value);
      else params.delete("search");
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);
  };

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        هنوز هیچ محصولی اضافه نشده است.
      </p>
    );
  }

  return (
    <div className="p-6">
      <SearchBar
        onSearch={handleSearch}
        placeholder="جستجو بر اساس نام محصول"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {currentItems.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() =>
              router.push(`/products/${encodeURIComponent(product.name)}`)
            }
            className="cursor-pointer bg-white dark:bg-gray-950 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300"
          >
            <div className="relative w-full h-60">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Image
                    src="/no-image.jpg"
                    alt={product.name || "محصول"}
                    width={720}
                    height={1080}
                    className="w-48 h-48 object-cover rounded-xl shadow-md border"
                  />
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
                {product.description ||
                  "توضیحات محصول اینجا نمایش داده می‌شود."}
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

      <Pagination
        items={filteredProducts}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);

          //  Upadte Url For Pagination
          const params = new URLSearchParams(window.location.search);
          params.set("page", page.toString());
          router.replace(`?${params.toString()}`, { scroll: false });
        }}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
