import { Home, Package, Users, FileText, Settings, LogOut, Gift } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: FileText, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Gift, label: "Coupon", path: "/admin/coupon" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItemClass = (path: string) =>
    `flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
      location.pathname === path
        ? "bg-gray-100 text-primary font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:static md:translate-x-0 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-xl text-primary">Admin Panel</h2>
        </div>

        <div className="py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={menuItemClass(item.path)}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => {
                signOut();
                setIsSidebarOpen(false); // Close sidebar on logout
              }}
              className="w-full flex items-center px-4 py-3 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
