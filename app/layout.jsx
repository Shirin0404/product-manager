import Navbar from "@/components/Navbar";
import "./globals.css";
import RouteLoader from "@/components/RouteLoader";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        <RouteLoader />
        {children}
      </body>
    </html>
  );
}
