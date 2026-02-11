import { useEffect, useState } from "react";
import Product from "./Product";
import "./ProductGrid.css";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <section className="product-grid">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
}
