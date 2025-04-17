import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    slug: "",
    description: "",
    category: "",
    mainImage: "",
    features: [],
    variants: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data);
  };

  const handleSubmit = async () => {
    if (form.id) {
      await axios.put(`/api/products/${form.id}`, form);
    } else {
      await axios.post("/api/products", form);
    }
    fetchProducts();
    setForm({ id: "", name: "", slug: "", description: "", category: "", mainImage: "", features: [], variants: [] });
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mb-6"
      >
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Input
          placeholder="Main Image URL"
          value={form.mainImage}
          onChange={(e) => setForm({ ...form, mainImage: e.target.value })}
        />
        <Button type="submit">{form.id ? "Update" : "Add"} Product</Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h2 className="font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <Button onClick={() => handleEdit(product)}>Edit</Button>
            <Button variant="destructive" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
