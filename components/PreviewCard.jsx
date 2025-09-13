"use client";

import Image from "next/image";

export default function PreviewCard({ product }) {
  if (!product) return null;

  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <div className="w-4/5  bg-white dark:bg-gray-950 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4 text-center text-purple-600">
        📌 پیش‌نمایش محصول
      </h2>
      <div className="flex flex-col items-center gap-4">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name || "محصول"}
            className="w-48 h-48 object-cover rounded-xl shadow-md border"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center rounded-xl bg-gray-100 text-gray-400">
          <Image
            src="/no-image.jpg"
            alt={product.name || "محصول"}
            width={720}
            height={1080}
            className="w-48 h-48 object-cover rounded-xl shadow-md border"
          />
          </div>
        )}

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">
            {product.name || "نام محصول"}
          </h3>
          <p className="text-green-600 font-bold">
            {product.price ? `${formatPrice(product.price)} تومان` : "قیمت"}
          </p>
          <p className="text-sm text-blue-500">
            {product.category || "دسته‌بندی"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {product.description || "توضیحات محصول اینجا نمایش داده می‌شود."}
          </p>
        </div>
      </div>
    </div>
  );
}
