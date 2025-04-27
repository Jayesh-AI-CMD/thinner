import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Check,
  ChevronRight,
  Package,
  ChevronLeft,
} from "lucide-react";
import { MobileStickyBenefits } from "@/components/home/FeaturedBenefits";
import ProductCard from "@/components/product/ProductCard";
import { supabase } from "@/integrations/supabase/client";


const ProductDetailPageLatest = () => {
  const { id } = useParams<{ id: string }>();
  console.log("🚀 ~ ProductDetailPageLatest ~ id:", id)
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(
            `
            *,
            product_variants (*)
          `
          )
          .eq("id", id)
          .single();

        if (error) throw error;

        setProduct(data);
        setSelectedVariant(data?.product_variants?.[0] || null);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(
            `
            *,
            product_variants (*)
          `
          )
          .neq("id", id)
          .limit(4);

        if (error) throw error;

        const mappedProducts = data?.map((product) => ({
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
        setRelatedProducts(mappedProducts);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Please select a valid variant before adding to the cart.");
      return;
    }

    if (selectedVariant.stock <= 0) {
      alert("The selected variant is out of stock.");
      return;
    }

    addToCart(product, quantity, selectedVariant.id);
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-brand-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/products" className="hover:text-brand-600">Products</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-700 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 mb-4">
                <img
                  src={selectedVariant?.image || product.main_image}
                  alt={product.name}
                  className="w-full object-contain aspect-square"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.product_variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`border rounded-md overflow-hidden p-1 transition-all ${
                      selectedVariant?.id === variant.id
                        ? "border-brand-600 ring-2 ring-brand-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="aspect-square">
                      <img
                        src={variant.image}
                        alt={`${product.name} ${variant.size}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs text-center mt-1 font-medium">
                      {variant.size}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="mb-4">
                {selectedVariant && (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">₹{selectedVariant.price}</span>
                    {selectedVariant.stock > 0 ? (
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="h-3.5 w-3.5 mr-1" />
                        In Stock
                      </span>
                    ) : (
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Size Options */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size Options</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.product_variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border rounded-md overflow-hidden p-2 text-center transition-all ${
                        selectedVariant?.id === variant.id
                          ? "border-brand-600 ring-2 ring-brand-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-sm font-medium">{variant.size}</div>
                      <div className="text-xs text-gray-500">₹{variant.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-500 mt-2">Units per box: 32</div>
              </div>

              {/* Add to Cart */}
              <div className="mb-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || selectedVariant.stock <= 0}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Features List */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {JSON.parse(product.features).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Application</h3>
                <ul className="space-y-2">
                  {product.application.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-brand-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Benefits */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.key_benefits.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Method */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Application Method</h3>
                <ul className="space-y-2">
                  {product.application_method.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-brand-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precautions */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Precautions</h3>
                <ul className="space-y-2">
                  {product.precautions.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Storage & Handling */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Storage & Handling</h3>
                <ul className="space-y-2">
                  {product.storage_handling.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-brand-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MobileStickyBenefits />
    </Layout>
  );
};

export default ProductDetailPageLatest;