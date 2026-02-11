import ProductGrid from "../components/ProductGrid";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  return (
    <>
      <header>
        <h1>Products</h1>
      </header>
      <main>
        <ProductGrid />
      </main>
    </>
  );
}
