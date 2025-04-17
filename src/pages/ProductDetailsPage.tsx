import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${slug}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [slug]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <img src={product.mainImage} alt={product.name} />
      {/* Add more product details here */}
    </div>
  );
};

export default ProductDetailsPage;
