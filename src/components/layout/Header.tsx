import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, User, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, FileText, ShoppingBag, Settings } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import MobileMenu from "./MobileMenu";
import SearchBar from "../SearchBar";

const Header = () => {
  const { user, role, signOut } = useAuth();

  // Gracefully handle the case where the user does not exist
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const productsMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { cartItems, cartTotal } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleMouseEnterProductsMenu = () => {
    if (productsMenuTimeoutRef.current) {
      clearTimeout(productsMenuTimeoutRef.current);
    }
    setShowProductsMenu(true);
  };

  const handleMouseLeaveProductsMenu = () => {
    productsMenuTimeoutRef.current = setTimeout(() => {
      setShowProductsMenu(false);
    }, 200); // Delay of 200ms
  };

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
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-50">
          <Link to="/" className="flex items-center">
            <img src="/public/logo.png" alt="Logo" className="h-8 w-8" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-brand-600 font-medium">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={handleMouseEnterProductsMenu}
            onMouseLeave={handleMouseLeaveProductsMenu}
          >
            <button
              onClick={() => setShowProductsMenu(!showProductsMenu)}
              className="flex items-center text-gray-700 hover:text-brand-600 font-medium"
            >
              Products <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {showProductsMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <div className="p-2 space-y-1">
                  <Link
                    to="/products"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md"
                  >
                    All Products
                  </Link>
                  <Link
                    to="/products/royal-gp-thinner"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md"
                  >
                    Royal GP Thinner
                  </Link>
                  <Link
                    to="/products/sailac-pu-thinner"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md"
                  >
                    Sailac PU Thinner
                  </Link>
                  <Link
                    to="/products/top-999-nc-thinner"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md"
                  >
                    Top 999 NC Thinner
                  </Link>
                  <Link
                    to="/products/royal-2000-nc-thinner"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md"
                  >
                    Royal 2000 NC Thinner
                  </Link>
                  <Link
                    to="/products/top-2000-high-gloss-nc-thinner"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 rounded-md"
                  >
                    Top 2000 High Gloss NC Thinner
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/about" className="text-gray-700 hover:text-brand-600 font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-brand-600 font-medium">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={toggleSearchBar} className="text-gray-600 hover:text-brand-600">
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <UserIcon size={16} />
                    <span>{user.email || "User"}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {role === "Admin" || role === "Superadmin" ? (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuItem asChild>
                    <Link to="/orders">
                      <ShoppingBag className="mr-2 h-4 w-4" /> Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/downloads">
                      <FileText className="mr-2 h-4 w-4" /> Downloads
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account-details">
                      <Settings className="mr-2 h-4 w-4" /> Account Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <UserIcon size={16} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <UserIcon size={16} />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
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