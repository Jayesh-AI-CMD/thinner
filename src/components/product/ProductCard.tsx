import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { Check, X } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log("🚀 ~ ProductCard ~ product:", product)
  // Calculate the minimum price from variants
  const minPrice = product?.variants?.length
  ? product.variants.reduce((min, variant) => {
      const price = variant.price;
      return price < min ? price : min;
    }, product.variants[0].price)
  : null;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/products/id/${product.id}`}>
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-48 object-cover"
        />  
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2 truncate">{product.category}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            ₹{minPrice  ?? 0}
          </span>
          {product.sampleAvailable ? (
            <span className="text-xs text-green-600 flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Sample Available
            </span>
          ) : (
            <span className="text-xs text-red-600 flex items-center">
              <X className="h-4 w-4 mr-1" />
              No Sample
            </span>
          )}
        </div>
        <Link
          to={`/products/id/${product.id}`}
          className="text-sm text-brand-600 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
