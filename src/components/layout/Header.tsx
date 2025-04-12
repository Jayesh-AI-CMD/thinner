
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Menu,
  User,
  X,
  Search,
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import MobileMenu from "./MobileMenu";
import SearchBar from "../SearchBar";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { cartItems, cartTotal } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-white py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-10">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-700">ThinnerMart</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-600 font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-brand-600 font-medium">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                <div className="p-2 space-y-1">
                  <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md">
                    All Products
                  </Link>
                  <Link to="/products/royal-gp-thinner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md">
                    Royal GP Thinner
                  </Link>
                  <Link to="/products/sailac-pu-thinner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md">
                    Sailac PU Thinner
                  </Link>
                  <Link to="/products/top-999-nc-thinner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md">
                    Top 999 NC Thinner
                  </Link>
                  <Link to="/products/royal-2000-nc-thinner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md">
                    Royal 2000 NC Thinner
                  </Link>
                  <Link to="/products/top-2000-high-gloss-nc-thinner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md">
                    Top 2000 High Gloss NC Thinner
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-gray-700 hover:text-brand-600 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-brand-600 font-medium">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSearchBar}
            className="text-gray-600 hover:text-brand-600"
          >
            <Search size={20} />
          </button>

          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-brand-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <div className="hidden md:block">
            <Link to="/account">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User size={16} />
                <span>Account</span>
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {showSearchBar && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4">
          <SearchBar onClose={toggleSearchBar} />
        </div>
      )}

      {showMobileMenu && <MobileMenu onClose={toggleMobileMenu} />}
    </header>
  );
};

export default Header;
