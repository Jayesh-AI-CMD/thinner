import { supabase } from "@/integrations/supabase/client";
import { Product, ProductVariant } from "@/lib/types";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("name");

    if (error) throw error;

    // For each product, fetch its variants
    const productsWithVariants = await Promise.all(
      products.map(async (product) => {
        const { data: variants, error: variantsError } = await supabase
          .from("product_variants")
          .select("*")
          .eq("product_id", product.id)
          .order("price");

        if (variantsError) throw variantsError;

        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          features: product.features,
          variants: variants.map((variant) => ({
            id: variant.id,
            size: variant.size as ProductVariant["size"],
            price: variant.price,
            stock: variant.stock,
            image: variant.image,
          })),
          mainImage: product.main_image,
          sampleAvailable: product.sample_available,
          samplePrice: product.sample_price || 0,
        };
      })
    );

    return productsWithVariants;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a single product by slug
export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // No rows returned
      throw error;
    }

    // Fetch variants for this product
    const { data: variants, error: variantsError } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", product.id)
      .order("price");

    if (variantsError) throw variantsError;

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      features: product.features,
      variants: variants.map((variant) => ({
        id: variant.id,
        size: variant.size as ProductVariant["size"],
        price: variant.price,
        stock: variant.stock,
        image: variant.image,
      })),
      mainImage: product.main_image,
      sampleAvailable: product.sample_available,
      samplePrice: product.sample_price || 0,
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // No rows returned
      throw error;
    }

    // Fetch variants for this product
    const { data: variants, error: variantsError } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", product.id)
      .order("price");

    if (variantsError) throw variantsError;

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      features: product.features,
      variants: variants.map((variant) => ({
        id: variant.id,
        size: variant.size as ProductVariant["size"],
        price: variant.price,
        stock: variant.stock,
        image: variant.image,
      })),
      mainImage: product.main_image,
      sampleAvailable: product.sample_available,
      samplePrice: product.sample_price || 0,
    };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};

// Get a variant by ID
export const fetchVariantById = async (productId: string, variantId: string): Promise<ProductVariant | null> => {
  try {
    const { data: variant, error } = await supabase
      .from("product_variants")
      .select("*")
      .eq("id", variantId)
      .eq("product_id", productId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // No rows returned
      throw error;
    }

    return {
      id: variant.id,
      size: variant.size as ProductVariant["size"],
      price: variant.price,
      stock: variant.stock,
      image: variant.image,
    };
  } catch (error) {
    console.error("Error fetching variant by id:", error);
    throw error;
  }
};

// Fetch all products without variants
export const fetchAllProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select(`
      *,
      product_variants (*)
    `);
    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
};
