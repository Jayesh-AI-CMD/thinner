import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/product/ProductGrid";
import { MobileStickyBenefits } from "@/components/home/FeaturedBenefits";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProductsPage = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["publicProducts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
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
    variants: [],
  }));

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-lg text-gray-600">
              Browse our complete range of premium quality thinners for various applications
            </p>
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ProductGrid products={mappedProducts || []} />
          )}
        </div>
      </section>
      <MobileStickyBenefits />
    </Layout>
  );
};

export default ProductsPage;
