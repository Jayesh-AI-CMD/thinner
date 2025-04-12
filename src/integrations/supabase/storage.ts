
import { supabase } from "./client";

/**
 * Upload a file to Supabase Storage
 * @param bucket The storage bucket name
 * @param path The path within the bucket
 * @param file The file to upload
 * @returns The public URL of the uploaded file
 */
export const uploadFile = async (bucket: string, path: string, file: File): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // Get the public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return urlData.publicUrl;
  } catch (error: any) {
    console.error("Error uploading file:", error.message);
    throw error;
  }
};

/**
 * Delete a file from Supabase Storage
 * @param bucket The storage bucket name
 * @param path The path within the bucket
 */
export const deleteFile = async (bucket: string, path: string): Promise<void> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
  } catch (error: any) {
    console.error("Error deleting file:", error.message);
    throw error;
  }
};

/**
 * Get a list of files from Supabase Storage
 * @param bucket The storage bucket name
 * @param path The path within the bucket
 * @returns List of files
 */
export const listFiles = async (bucket: string, path: string = "") => {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(path);
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error listing files:", error.message);
    throw error;
  }
};
