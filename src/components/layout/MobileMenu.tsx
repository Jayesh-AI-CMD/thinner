
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-auto">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-lg font-medium">Home</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-lg font-medium">Products</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li className="pl-4 border-l-2 border-gray-200">
                <Link 
                  to="/products/royal-gp-thinner" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-base">Royal GP Thinner</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li className="pl-4 border-l-2 border-gray-200">
                <Link 
                  to="/products/sailac-pu-thinner" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-base">Sailac PU Thinner</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li className="pl-4 border-l-2 border-gray-200">
                <Link 
                  to="/products/top-999-nc-thinner" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-base">Top 999 NC Thinner</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li className="pl-4 border-l-2 border-gray-200">
                <Link 
                  to="/products/royal-2000-nc-thinner" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-base">Royal 2000 NC Thinner</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li className="pl-4 border-l-2 border-gray-200">
                <Link 
                  to="/products/top-2000-high-gloss-nc-thinner" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-base">Top 2000 High Gloss NC Thinner</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-lg font-medium">About Us</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="text-lg font-medium">Contact</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div className="space-y-3">
              <Link to="/login" onClick={onClose}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={onClose}>
                <Button 
                  className="w-full justify-start"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
