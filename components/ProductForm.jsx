"use client";

import { motion } from "framer-motion";
import {
  Tag,
  Image as ImageIcon,
  DollarSign,
  ClipboardList,
  PackagePlus,
} from "lucide-react";
import PreviewCard from "@/components/PreviewCard";
import { useProductStore } from "@/stores/productStore";
import Swal from "sweetalert2";
import { useRef } from "react";

export default function ProductForm() {
  const { formData, setField, resetForm } = useProductStore();

  // Input Focous
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageUrlRef = useRef(null);

  const fieldRefs = {
    name: nameRef,
    price: priceRef,
    category: categoryRef,
    description: descriptionRef,
    imageUrl: imageUrlRef,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "نام محصول",
      "قیمت محصول",
      "دسته بندی محصول",
      "توضیحات محصول",
      "آدرس عکس محصول",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].toString().trim() === ""
    );

    // Alert for empty feilds
    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        html: `لطفاً فیلدهای زیر را پر کنید:<br>${missingFields.join(", ")}`,
        didClose: () => {
          //  Focous On First Empty Feield
          const firstMissing = missingFields[0];
          fieldRefs[firstMissing]?.current?.focus();
        },
      });
      return;
    }

    // Save in LocalStorge
    const existing = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem("products", JSON.stringify([...existing, formData]));

    Swal.fire({
      icon: "success",
      title: "موفقیت",
      text: "محصول با موفقیت ذخیره شد",
      timer: 2000,
      showConfirmButton: false,
    });

    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center w-full rounded-2xl min-h-screen gap-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6"
    >
      <div className="w-4/5 p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <PackagePlus className="w-6 h-6 text-pink-500" />
          افزودن محصول جدید
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-purple-500" />
            <input
              type="text"
              name="name"
              ref={nameRef}
              placeholder="نام محصول"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <input
              type="number"
              name="price"
              ref={priceRef}
              placeholder="قیمت"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            <input
              type="text"
              name="category"
              ref={categoryRef}
              placeholder="دسته‌بندی"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-start gap-2">
            <textarea
              name="description"
              ref={descriptionRef}
              placeholder="توضیحات"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-pink-500" />
            <input
              type="url"
              name="imageUrl"
              ref={imageUrlRef}
              placeholder="آدرس تصویر (http...)"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              افزودن محصول
            </button>
          </motion.div>
        </form>
      </div>

      <PreviewCard product={formData} />
    </motion.div>
  );
}
