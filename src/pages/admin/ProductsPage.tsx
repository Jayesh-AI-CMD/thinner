import { useState } from "react";
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
import { useRouter } from "next/router";
import { useEffect as useAuthEffect } from "react";

const ProductsPage = () => {
  // --- Auth check ---
  const router = useRouter();
  useAuthEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        router.replace("/login");
      }
    });
  }, [router]);
  // --- end auth check ---

  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Extract form values
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string || name.toLowerCase().replace(/\s+/g, '-');
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const mainImage = formData.get("mainImage") as string;
    const features = (formData.get("features") as string).split('\n').filter(Boolean);
    const sampleAvailable = formData.get("sampleAvailable") === "on";
    const samplePrice = sampleAvailable ? Number(formData.get("samplePrice")) * 100 : null;
    
    try {
      // Insert the product
      const { data, error } = await supabase
        .from("products")
        .insert({
          name,
          slug,
          description,
          category,
          main_image: mainImage,
          features,
          sample_available: sampleAvailable,
          sample_price: samplePrice,
        })
        .select();
      
      if (error) throw error;
      
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
                <TableHead>Category</TableHead>
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
                  <TableCell>{product.category}</TableCell>
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
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mainImage">Main Image URL</Label>
                <Input id="mainImage" name="mainImage" required />
              </div>
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
