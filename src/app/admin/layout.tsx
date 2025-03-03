import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import "../globals.css"; // ✅ Ensure global styles apply in admin panel

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="dark:bg-[#111423] min-h-screen flex flex-col">
        
      
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
    </body>
    </html>
  );
}
