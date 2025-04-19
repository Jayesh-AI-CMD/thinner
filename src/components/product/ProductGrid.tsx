
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  console.log("🚀 ~ ProductGrid ~ filteredProducts:", filteredProducts)
  const [filters, setFilters] = useState({
    category: "",
    sampleAvailable: false,
    priceRange: { min: 0, max: 5000 }
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Apply sample availability filter
    if (filters.sampleAvailable) {
      filtered = filtered.filter(p => p.sampleAvailable);
    }

    // Apply price range filter
    filtered = filtered.filter(p => {
      const minPrice = p.variants.reduce(
        (min, variant) => (variant.price < min ? variant.price : min),
        p.variants[0]?.price || 0
      );
      
      return minPrice >= filters.priceRange.min && minPrice <= filters.priceRange.max;
    });

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      sampleAvailable: false,
      priceRange: { min: 0, max: 5000 }
    });
    setFilteredProducts(products);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Products ({filteredProducts.length})</h2>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={toggleFilters}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={toggleFilters}></div>
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl animate-slide-in-right p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Filters</h3>
              <Button variant="ghost" size="icon" onClick={toggleFilters}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.category}
                  onChange={e => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  <option value="thinner">Thinner</option>
                  <option value="sample">Sample</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sampleAvailableMobile"
                  checked={filters.sampleAvailable}
                  onChange={e => setFilters({ ...filters, sampleAvailable: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="sampleAvailableMobile" className="text-sm">Sample Available</label>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={e => setFilters({
                      ...filters,
                      priceRange: { ...filters.priceRange, min: Number(e.target.value) }
                    })}
                    className="w-1/2 p-2 border rounded-md"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={e => setFilters({
                      ...filters,
                      priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                    })}
                    className="w-1/2 p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="w-1/2" onClick={resetFilters}>
                  Reset
                </Button>
                <Button className="w-1/2" onClick={() => {
                  applyFilters();
                  toggleFilters();
                }}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop filters */}
      <div className="hidden md:grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-medium mb-4">Filters</h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.category}
                  onChange={e => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  <option value="thinner">Thinner</option>
                  <option value="sample">Sample</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sampleAvailable"
                  checked={filters.sampleAvailable}
                  onChange={e => setFilters({ ...filters, sampleAvailable: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="sampleAvailable">Sample Available</label>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={e => setFilters({
                      ...filters,
                      priceRange: { ...filters.priceRange, min: Number(e.target.value) }
                    })}
                    className="w-1/2 p-2 border rounded-md"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={e => setFilters({
                      ...filters,
                      priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                    })}
                    className="w-1/2 p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="w-1/2" onClick={resetFilters}>
                  Reset
                </Button>
                <Button className="w-1/2" onClick={applyFilters}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile product grid (no filters visible) */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
