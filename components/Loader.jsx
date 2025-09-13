"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin border-t-[var(--gold)] border-r-[var(--gold)]"></div>

        <span className="absolute w-12 h-12 rounded-full bg-[var(--gold)] opacity-75 animate-ping"></span>
        <span className="absolute w-16 h-16 rounded-full bg-[var(--gold)] opacity-50 animate-ping delay-200"></span>
        <span className="absolute w-24 h-24 rounded-full bg-[var(--gold)] opacity-30 animate-ping delay-500"></span>

        <span className="relative w-6 h-6 rounded-full bg-[var(--gold)]"></span>
      </div>
    </div>
  );
}
