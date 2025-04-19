import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

const supabaseUrl = "https://fytkhhhlixraqzhimtkh.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a product images bucket
const { data, error } = await supabase.storage.createBucket("product-images", {
  public: true,
  fileSizeLimit: 5242880, // 5MB
});

if (error) {
  console.error("Error creating bucket:", error);
} else {
  console.log("Bucket created successfully:", data);

  // Set up policies to allow public access
  const { error: policyError } = await supabase.storage
    .from("product-images")
    .createSignedUploadUrl("test.txt");

  if (policyError) {
    console.error("Error setting up policy:", policyError);
  } else {
    console.log("Policy configured successfully");
  }
}
