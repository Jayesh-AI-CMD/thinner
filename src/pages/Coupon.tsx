import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    description: "",
    discount_type: "",
    discount_value: 0,
    min_order_value: 0,
    max_discount: 0,
    starts_at: "",
    expires_at: "",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch coupons
  const fetchCoupons = async () => {
    const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching coupons:", error);
    } else {
      setCoupons(data);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create or Update coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update coupon
      const { error } = await supabase.from("coupons").update(formData).eq("id", formData.id);
      if (error) {
        console.error("Error updating coupon:", error);
      } else {
        alert("Coupon updated successfully!");
        setIsEditing(false);
      }
    } else {
      console.log("🚀 ~ handleSubmit ~ formData:", formData)
      delete formData.id;
      // Create coupon
      const { error } = await supabase.from("coupons").insert([formData]);
      if (error) {
        console.error("Error creating coupon:", error);
      } else {
        alert("Coupon created successfully!");
      }
    }
    setFormData({
      id: null,
      code: "",
      description: "",
      discount_type: "",
      discount_value: 0,
      min_order_value: 0,
      max_discount: 0,
      starts_at: "",
      expires_at: "",
      active: true,
    });
    fetchCoupons();
  };

  // Delete coupon
  const handleDelete = async (id) => {
    const { error } = await supabase.from("coupons").delete().eq("id", id);
    if (error) {
      console.error("Error deleting coupon:", error);
    } else {
      alert("Coupon deleted successfully!");
      fetchCoupons();
    }
  };

  // Edit coupon
  const handleEdit = (coupon) => {
    setFormData(coupon);
    setIsEditing(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Coupons</h1>

        {/* Coupon Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Coupon Code</label>
              <Input
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter coupon code"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount Type</label>
              <select
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="" disabled>
                  Select Discount Type
                </option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount Value</label>
              <Input
                name="discount_value"
                type="number"
                value={formData.discount_value}
                onChange={handleChange}
                placeholder="Enter discount value"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Min Order Value</label>
              <Input
                name="min_order_value"
                type="number"
                value={formData.min_order_value}
                onChange={handleChange}
                placeholder="Enter minimum order value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Discount</label>
              <Input
                name="max_discount"
                type="number"
                value={formData.max_discount}
                onChange={handleChange}
                placeholder="Enter maximum discount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Input
                name="starts_at"
                type="datetime-local"
                value={formData.starts_at}
                onChange={handleChange}
                placeholder="Select start date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <Input
                name="expires_at"
                type="datetime-local"
                value={formData.expires_at}
                onChange={handleChange}
                placeholder="Select expiry date"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button type="submit">{isEditing ? "Update Coupon" : "Create Coupon"}</Button>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    id: null,
                    code: "",
                    description: "",
                    discount_type: "",
                    discount_value: 0,
                    min_order_value: 0,
                    max_discount: 0,
                    starts_at: "",
                    expires_at: "",
                    active: true,
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* Coupon List */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.description}</TableCell>
                <TableCell>
                  {coupon.discount_type === "percentage"
                    ? `${coupon.discount_value}%`
                    : `₹${coupon.discount_value}`}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(coupon)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(coupon.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default Coupon;
