import { useEffect, useState } from "react";
import Product from "./Product";
import styles from "./ProductGrid.module.css";

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
    <section className={styles.grid} aria-label="Product list">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
}
