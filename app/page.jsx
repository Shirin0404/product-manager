// app/page.jsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">مدیریت محصولات</h1>
      <Link
        href="/add-product"
        className="px-6 py-3 rounded-xl bg-[var(--gold)] text-white  transition"
      >
        افزودن محصول
      </Link>
    </main>
  );
}
