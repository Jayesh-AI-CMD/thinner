import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Layout from "@/components/layout/Layout";
import { getProductBySlug } from "@/lib/product-data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Check, 
  ChevronRight, 
  Package,
  Droplet,
  Info,
  Shield,
  ChevronLeft
} from "lucide-react";
import { MobileStickyBenefits } from "@/components/home/FeaturedBenefits";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/product-data";

const productVariants = [
  { id: '400ml', size: '400 ML', image: '/400ml.png', price: 100, stock: 10 },
  { id: '500ml', size: '500 ML', image: '/500ml.png', price: 150, stock: 15 },
  { id: '800ml', size: '800 ML', image: '/800ml.png', price: 200, stock: 20 },
  { id: '1600ml', size: '1600 ML', image: '/1600ml.png', price: 300, stock: 25 },
  { id: '1l', size: '1L', image: '/1l.png', price: 400, stock: 30 },
  { id: '2l', size: '2L', image: '/2l.png', price: 500, stock: 35 },
  { id: '4l', size: '4L', image: '/4l.png', price: 600, stock: 40 },
  { id: '5l', size: '5L', image: '/5-LTR.png', price: 700, stock: 45 },
  { id: '8l', size: '8L', image: '/8l.png', price: 800, stock: 50 },
  { id: '10l', size: '10L', image: '/10l.png', price: 900, stock: 55 },
];

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = {
    ...getProductBySlug(slug || ""),
    variants: productVariants,
  };
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || null);
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = products
    .filter(p => p.id !== product?.id)
    .slice(0, 4);

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

  const handleAddToCart = () => {
    if (selectedVariant) {
      const totalQuantity = quantity * 32; // Calculate total quantity based on units per box
      addToCart(product.id, totalQuantity, selectedVariant.id);
    }
  };

  const handleAddSampleToCart = () => {
    addToCart(product.id, 1, undefined, true);
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

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
                src="/5-LTR.png" 
                alt={product.name}
                className="w-full object-contain aspect-square"
              />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.variants.map((variant) => (
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
              <Link to="/products" className="inline-flex items-center text-sm text-brand-600 mb-4 md:hidden">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Products
              </Link>

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

              {/* Options */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size Options</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`py-2 px-1 border rounded text-sm font-medium flex flex-col items-center justify-center transition-colors ${
                        selectedVariant?.id === variant.id 
                          ? "border-brand-600 bg-brand-50 text-brand-700" 
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{variant.size}</span>
                      <span className="text-xs mt-1">₹{variant.price}</span>
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
                  <span className="ml-3 text-sm text-gray-500">
                    Units per box : 32
                  </span>
                </div>
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
                
                {product.sampleAvailable && (
                  <Button 
                    onClick={handleAddSampleToCart}
                    variant="outline"
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    <Package className="h-5 w-5 mr-2" />
                    Add Sample (₹{product.samplePrice})
                  </Button>
                )}
              </div>

              {/* Features List */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full border-b grid grid-cols-4 md:w-auto md:inline-flex">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="safety">Safety & Storage</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  Our {product.name} is manufactured in our state-of-the-art facility using the highest quality raw materials and advanced production processes. Each batch undergoes rigorous quality testing to ensure consistent performance.
                </p>
                <p>
                  Designed for professional use, this thinner provides excellent results in various applications, from automotive painting to furniture finishing and industrial coatings.
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="p-4">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium mb-3 flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-brand-600" />
                      Physical Properties
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Appearance:</span>
                        <span className="font-medium">Clear liquid</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Specific Gravity:</span>
                        <span className="font-medium">0.85 - 0.90</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Flash Point:</span>
                        <span className="font-medium">4°C</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Boiling Range:</span>
                        <span className="font-medium">56 - 140°C</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Evaporation Rate:</span>
                        <span className="font-medium">Medium-Fast</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium mb-3 flex items-center">
                      <Package className="h-5 w-5 mr-2 text-brand-600" />
                      Packaging Information
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Available Sizes:</span>
                        <span className="font-medium">400ml to 10L</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Packaging Type:</span>
                        <span className="font-medium">Metal Can / Drum</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Shelf Life:</span>
                        <span className="font-medium">24 months</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Box Quantity:</span>
                        <span className="font-medium">32 units</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Batch Number:</span>
                        <span className="font-medium">On Package</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="applications" className="p-4">
                <h3 className="text-xl font-semibold mb-4">Recommended Applications</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Info className="h-5 w-5 mr-2 text-brand-600" />
                      Ideal Uses
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Dilution of paints and coatings</li>
                      <li>Surface preparation and cleaning</li>
                      <li>Equipment cleaning after painting</li>
                      <li>Removal of adhesives and residues</li>
                      <li>Industrial degreasing operations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Application Instructions</h4>
                    <p className="mb-3">
                      For optimal results, follow these guidelines when using {product.name}:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Dilution:</span> Start with a ratio of 10-15% thinner to paint, adjusting as needed based on application method and desired finish.
                      </li>
                      <li>
                        <span className="font-medium">Surface Cleaning:</span> Apply with a clean, lint-free cloth. For stubborn residues, allow to dwell briefly before wiping.
                      </li>
                      <li>
                        <span className="font-medium">Equipment Cleaning:</span> Flush equipment immediately after use. For dried materials, allow to soak before cleaning.
                      </li>
                      <li>
                        <span className="font-medium">Temperature:</span> Use in temperatures between 10-35°C for best results. Adjust dilution ratio in extreme temperatures.
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="safety" className="p-4">
                <h3 className="text-xl font-semibold mb-4">Safety & Storage Information</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="text-lg font-medium mb-2 text-red-700 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Safety Precautions
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                      <li>Highly flammable liquid and vapor. Keep away from heat, sparks, open flames, and hot surfaces.</li>
                      <li>Use in well-ventilated areas. Avoid breathing vapors.</li>
                      <li>Wear appropriate protective equipment including gloves and eye protection.</li>
                      <li>Keep out of reach of children.</li>
                      <li>In case of skin contact, wash thoroughly with soap and water.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Storage Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Store in original container in a cool, dry place away from direct sunlight.</li>
                      <li>Keep container tightly closed when not in use.</li>
                      <li>Store away from oxidizing agents, strong acids, and alkalis.</li>
                      <li>Optimal storage temperature: 5-25°C.</li>
                      <li>Rotate stock: use oldest product first (first in, first out).</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium mb-2">Disposal Information</h4>
                    <p>
                      Do not dispose of thinner in drains, water courses, or soil. Dispose of contents and container in accordance with local, regional, and national regulations. Contact local waste disposal authority for guidance on disposal of unused or contaminated product.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MobileStickyBenefits />
    </Layout>
  );
};

export default ProductDetailPage;
