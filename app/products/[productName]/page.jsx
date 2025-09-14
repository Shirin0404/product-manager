"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function ProductDetailPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const productName = decodeURIComponent(pathname.split("/").pop());

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const foundProduct = storedProducts.find((p) => p.name === productName);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [productName]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">محصول یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

      <div className="w-full max-w-3xl bg-white dark:bg-gray-950 rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row gap-6">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name || "محصول"}
            className="w-full md:w-1/2 h-80 object-cover rounded-2xl"
          />
        ) : (
          <div className="w-full md:w-1/2 h-80 flex items-center justify-center  rounded-2xl">
            <img
              src="/no-image.jpg"
              alt="No Image"
              className="w-full md:w-1/2 h-80 object-cover rounded-2xl"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-4">
          <p className="text-green-600 text-2xl font-bold">
            {product.price?.toLocaleString("fa-IR")} تومان
          </p>
          <p className="text-blue-500 font-medium">{product.category}</p>
          <p className="text-gray-700 dark:text-gray-300">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
