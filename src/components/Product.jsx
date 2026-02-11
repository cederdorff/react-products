import { Link } from "react-router";
import "./Product.css";

export default function Product({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <article className="product-card">
        <img src={product.image} className="product-image" />
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">DKK {product.price}</p>
          <span className={`product-stock  ${product.inStock ? "in-stock" : "out-of-stock"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </article>
    </Link>
  );
}
