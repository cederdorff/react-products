import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
      const response = await fetch(url);
      const products = await response.json();
      const productToDisplay = products.find(p => p.id === productId);
      setProduct(productToDisplay);
    }

    fetchProducts();
  }, [productId]);

  return (
    <>
      <header>
        <h1>{product.title}</h1>
      </header>
      <main>
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-info">
            <span className="product-category">{product.category}</span>
            <h2>{product.title}</h2>
            <div className="product-rating">
              <span className="rating-stars">⭐ {product.rating?.rate}</span>
              <span className="rating-count">({product.rating?.count} reviews)</span>
            </div>
            <p className="product-price">DKK {product.price}</p>
            <span className={`product-stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <div className="product-description-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            <button className="add-to-cart-btn" disabled={!product.inStock}>
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
