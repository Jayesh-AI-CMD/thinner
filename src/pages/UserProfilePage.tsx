import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; // Assuming you have an Auth hook
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";

const UserProfilePage = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [formData, setFormData] = useState({
    name: "",
    // customer_email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gst_number: "",
    gst_business_name: "",
    gst_address: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle(); // Use maybeSingle to handle no rows gracefully

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setFormData(data);
      } else {
        console.warn("No profile found for the user.");
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } else {
      alert("Profile updated successfully!");
      setIsEditing(false); // Switch back to view mode after updating
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {!isEditing ? (
        // View Mode
        <div className="space-y-4">
          <p><strong>Name:</strong> {formData.name}</p>
          {/* <p><strong>Email:</strong> {formData.customer_email}</p> */}
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>State:</strong> {formData.state}</p>
          <p><strong>Pincode:</strong> {formData.pincode}</p>
          <p><strong>GST Number:</strong> {formData.gst_number}</p>
          <p><strong>GST Business Name:</strong> {formData.gst_business_name}</p>
          <p><strong>GST Address:</strong> {formData.gst_address}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          {/* <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div> */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">GST Number</label>
            <input
              type="text"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">GST Business Name</label>
            <input
              type="text"
              name="gst_business_name"
              value={formData.gst_business_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium">GST Address</label>
            <textarea
              name="gst_address"
              value={formData.gst_address}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
    </Layout>
  );
};

export default UserProfilePage;