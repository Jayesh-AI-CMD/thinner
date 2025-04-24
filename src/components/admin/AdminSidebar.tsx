
import { Home, Package, Users, FileText, Settings, LogOut, Gift } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: FileText, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Gift, label: "Coupon", path: "/admin/coupon" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-bold text-xl text-primary">Admin Panel</h2>
      </div>

      <div className="py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md hover:bg-gray-100 transition-colors",
                location.pathname === item.path
                  ? "bg-gray-100 text-primary font-medium"
                  : "text-gray-700"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => signOut()}
            className="w-full flex items-center px-4 py-3 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
