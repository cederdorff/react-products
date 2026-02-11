import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const headingRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
      const response = await fetch(url);
      const products = await response.json();
      const productToDisplay = products.find(p => p.id === productId);
      setProduct(productToDisplay);
      setLoading(false);
    }

    fetchProducts();
  }, [productId]);

  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | React Products`; // Set the document title based on the product title
      headingRef.current?.focus(); // Focus the heading for accessibility when the product details are loaded
    }
  }, [product]);

  if (loading) {
    return (
      <>
        <header>
          <h1>Loading...</h1>
        </header>
        <main id="main-content">
          <p>Loading product details...</p>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <header>
          <h1>Product Not Found</h1>
        </header>
        <main id="main-content">
          <p>The product you are looking for does not exist.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <header>
        <h1 ref={headingRef} tabIndex={-1}>
          {product.title}
        </h1>
      </header>
      <main id="main-content">
        <div className={styles.detail}>
          <div className={styles.detailImage}>
            <img src={product.image} alt={product.title || ""} />
          </div>
          <div className={styles.detailInfo}>
            <span className={styles.category}>{product.category}</span>
            <h2>{product.title}</h2>
            <div
              className={styles.rating}
              role="group"
              aria-label={`Rating: ${product.rating?.rate} out of 5, ${product.rating?.count} reviews`}>
              <span className={styles.ratingStars} aria-hidden="true">
                ⭐ {product.rating?.rate}
              </span>
              <span className={styles.ratingCount} aria-hidden="true">
                ({product.rating?.count} reviews)
              </span>
            </div>
            <p className={styles.price}>DKK {product.price}</p>
            <span
              className={`${styles.stock} ${product.inStock ? styles.inStock : styles.outOfStock}`}
              role="status"
              aria-label={product.inStock ? "In stock" : "Out of stock"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <div className={styles.descriptionSection}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            <button className={styles.addToCartBtn} disabled={!product.inStock}>
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
