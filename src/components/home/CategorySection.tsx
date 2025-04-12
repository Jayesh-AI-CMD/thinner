
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/product-data";
import ProductCard from "../product/ProductCard";

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our range of premium quality thinners for various applications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {products.slice(3, 5).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products">
            <Button size="lg" variant="outline" className="gap-2">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
