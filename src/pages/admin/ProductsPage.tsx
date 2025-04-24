import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit, MoreVertical, Plus, Trash } from "lucide-react";

const ProductsPage = () => {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [variants, setVariants] = useState([{ size: "", price: "", stock: "", image: null}]);

  // Fetch products
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_variants (*)
        `);

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const testQuery = async () => {
      try {
        const { data, error } = await supabase.from("products").select(`
          *,
          product_variants (*)
        `);
        if (error) {
          console.error("Supabase query error:", error);
        }
      } catch (err) {
        console.error("Unexpected error during test query:", err);
      }
    };

    testQuery();
  }, []);

  useEffect(() => {
    if (products === undefined) {
      console.error("Products data is undefined. Check the database or query.");
    } else if (products.length === 0) {
      console.warn("No products found in the database.");
    }
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select(`
          *,
          product_variants (*)
        `);
        if (error) {
          console.error("Error fetching products:", error);
        }
      } catch (err) {
        console.error("Unexpected error during fetch:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-images") // Replace with your Supabase storage bucket name
        .upload(fileName, file);
        console.log("🚀 ~ handleImageUpload ~ data:", data)

      if (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
        return null;
      }

      const { data:pathUrl } = await supabase.storage
        .from("product-images")
        .getPublicUrl(data.path);
        console.log("🚀 ~ handleImageUpload ~ publicURL:", pathUrl)

      return pathUrl.publicUrl;
    } catch (err) {
      console.error("Unexpected error during image upload:", err);
      toast.error("Unexpected error during image upload.");
      return null;
    }
  };

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Extract form values
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string || name.toLowerCase().replace(/\s+/g, '-');
    const description = formData.get("description") as string;
    const mainImageFile = formData.get("mainImage") as File;
    const features = (formData.get("features") as string).split('\n').filter(Boolean);
    const sampleAvailable = formData.get("sampleAvailable") === "on";
    const samplePrice = sampleAvailable ? Number(formData.get("samplePrice")) * 100 : null;
    const category = formData.get("category") as string;

    try {
      // Upload the main image
      let mainImage = "";
      if (mainImageFile) {
        const uploadedImageUrl = await handleImageUpload(mainImageFile);
        console.log("🚀 ~ handleAddProduct ~ uploadedImageUrl:", uploadedImageUrl)
        if (!uploadedImageUrl) return; // Stop if image upload fails
        mainImage = uploadedImageUrl;
        console.log("🚀 ~ handleAddProduct ~ mainImage:", mainImage)
      }

      // Insert the product
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert({
          name,
          slug,
          description,
          main_image: mainImage,
          features,
          sample_available: sampleAvailable,
          sample_price: samplePrice,
          category,
        })
        .select();

      if (productError) throw productError;

      // Insert variants
      const productId = productData[0].id;
      console.log("🚀 ~ handleAddProduct ~ productData:", productData)
      const variantPromises = variants.map(async (variant) => {
        let variantImage = variant.image;
        if (variant.image) {
          const uploadedVariantImageUrl = await handleImageUpload(variant.image);
          if (!uploadedVariantImageUrl) return null; // Skip if image upload fails
          variantImage = uploadedVariantImageUrl;
        }
        return {
          ...variant,
          image: variantImage,
          product_id: productId,
        };
      });

      const resolvedVariants = await Promise.all(variantPromises);
      console.log("🚀 ~ handleAddProduct ~ resolvedVariants:", resolvedVariants)
      const { error: variantError } = await supabase
        .from("product_variants")
        .insert(resolvedVariants); // Filter out null values

      if (variantError) throw variantError;

      toast.success("Product added successfully!");
      setIsAddProductDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      
      if (error) throw error;
      
      toast.success("Product deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(`Error deleting product: ${error.message}`);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", price: "", stock: "", image: "" }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleVariantFileChange = (index: number, file: File) => {
    const updatedVariants = [...variants];
    updatedVariants[index].image = file;
    setVariants(updatedVariants);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={() => setIsAddProductDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.main_image} 
                      alt={product.name} 
                      className="h-12 w-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.product_variants?.length || 0} variants</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {products?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddProduct} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input id="slug" name="slug" placeholder="auto-generated-if-empty" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mainImage">Main Image</Label>
              <Input id="mainImage" name="mainImage" type="file" accept="image/*" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" placeholder="e.g., Electronics, Furniture" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea id="features" name="features" placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="sampleAvailable" name="sampleAvailable" />
              <Label htmlFor="sampleAvailable">Sample Available</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="samplePrice">Sample Price (₹)</Label>
              <Input id="samplePrice" name="samplePrice" type="number" />
            </div>

            {/* Product Variants Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Variants</h3>
              <div className="space-y-2">
                <Label>Variants</Label>
                <div className="space-y-2">
                  {variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-6 gap-2 items-center">
                      <Input
                        placeholder="Size"
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                      />
                      <Input
                        placeholder="Price (₹)"
                        type="number"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      />
                      <Input
                        placeholder="Stock"
                        type="number"
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleVariantFileChange(index, e.target.files?.[0] || null)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeVariant(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button type="button" onClick={addVariant}>
                  Add Variant
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ProductsPage;
