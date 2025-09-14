"use client";

import Link from "next/link";
import { Home, PlusCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-950 shadow-md px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-[#ab886d] transition"
      >
        <Home size={22} />
        <span className="hidden sm:inline">خانه</span>
      </Link>

      <Link
        href="/add-product"
        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-[#ab886d] transition"
      >
        <PlusCircle size={22} />
        <span className="hidden sm:inline">افزودن محصول</span>
      </Link>
    </nav>
  );
}
