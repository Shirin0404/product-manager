import CardList from "@/components/CardList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <CardList />
    </main>
  );
}
