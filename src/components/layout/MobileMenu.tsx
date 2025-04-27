import { Link } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();

  const menuItemClass =
    "flex items-center justify-between p-3 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-brand-600";

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 overflow-auto">
            <ul className="space-y-4">
              <li>
                <Link to="/" className={menuItemClass} onClick={onClose}>
                  <span>Home</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link to="/products" className={menuItemClass} onClick={onClose}>
                  <span>Products</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link to="/about" className={menuItemClass} onClick={onClose}>
                  <span>About Us</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className={menuItemClass} onClick={onClose}>
                  <span>Contact</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
            </ul>

            {/* User Links */}
            {user && (
              <div className="mt-6">
                <ul className="space-y-4">
                  <li>
                    <Link to="/dashboard" className={menuItemClass} onClick={onClose}>
                      <span>Dashboard</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className={menuItemClass} onClick={onClose}>
                      <span>Orders</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/downloads" className={menuItemClass} onClick={onClose}>
                      <span>Downloads</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/account-details" className={menuItemClass} onClick={onClose}>
                      <span>Account Details</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        signOut();
                        onClose();
                      }}
                      className={`${menuItemClass} text-left`}
                    >
                      <span>Logout</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </nav>

          {/* Footer Buttons */}
          {!user && (
            <div className="p-4 border-t">
              <div className="space-y-3">
                <Link to="/login" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={onClose}>
                  <Button className="w-full justify-center">Create Account</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;