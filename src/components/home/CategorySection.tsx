import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "../product/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CategorySection = () => {
  // Fetch products from the API
  const { data: products, isLoading } = useQuery({
    queryKey: ["publicProducts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select(`
        *,
        product_variants (*)
      `);
      return data;
    },
  });

  const mappedProducts = products?.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    mainImage: product.main_image,
    features: product.features,
    sampleAvailable: product.sample_available,
    samplePrice: product.sample_price,
    slug: product.slug,
    variants: product.product_variants.map((variant) => variant),
  }));


  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our range of premium quality thinners for various applications
          </p>
        </div>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mappedProducts?.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {mappedProducts?.slice(3, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

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
