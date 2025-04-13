import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/lib/types";
import { ShoppingCart, ExternalLink } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  // Get the starting price from the variants
  const startingPrice = product.variants.reduce(
    (min, variant) => (variant.price < min ? variant.price : min),
    product.variants[0]?.price || 0
  );

  const handleAddSampleToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Allow adding multiple samples if needed
    addToCart(product.id, 1, undefined, true);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden relative">
          <img
            src="/public/sample.png"
            alt={product.name}
            title={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* {product.sampleAvailable && (
            <div className="absolute top-2 right-2 bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
              Sample Available
            </div>
          )} */}
        </div>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1 text-gray-800" title="Premium Solvent for Nitrocellulose Paints and Coatings">Premium Solvent for Nitrocellulose Paints and Coatings </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2" title="The TOP 2000 High Gloss NC Thinner is a solvent-based product designed for thinning nitrocellulose paints, lacquers, and coatings. Ideal for wood, metal, and automotive surfaces, it ensures a high-gloss finish with improved flow and leveling. Suitable for brush, roller, or spraygun applications.">The TOP 2000 High Gloss NC Thinner is a solvent-based product designed for thinning nitrocellulose paints, lacquers, and coatings. Ideal for wood, metal, and automotive surfaces, it ensures a high-gloss finish with improved flow and leveling. Suitable for brush, roller, or spraygun applications.</p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-medium text-gray-900">From ₹{startingPrice}</span>
            
          </div>
          
          <div className="flex flex-col space-y-2">
            {product.sampleAvailable && (
              <Button
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={handleAddSampleToCart}
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                Add to Cart
              </Button>
            )}
            
            <Link to={`/products/${product.slug}`}>
              <Button className="w-full flex items-center justify-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductCard;
