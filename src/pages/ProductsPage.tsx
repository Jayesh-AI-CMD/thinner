
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/lib/product-data";
import { MobileStickyBenefits } from "@/components/home/FeaturedBenefits";

const ProductsPage = () => {
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
          
          <ProductGrid products={products} />
        </div>
      </section>
      <MobileStickyBenefits />
    </Layout>
  );
};

export default ProductsPage;
