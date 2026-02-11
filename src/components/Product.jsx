import { Link } from "react-router";
import styles from "./Product.module.css";

export default function Product({ product }) {
  return (
    <Link to={`/products/${product.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>DKK {product.price}</p>
          <span className={`${styles.stock} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </article>
    </Link>
  );
}
