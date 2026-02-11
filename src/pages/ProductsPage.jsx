import { useEffect, useRef } from "react";
import ProductGrid from "../components/ProductGrid";
// import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const headingRef = useRef(null);

  useEffect(() => {
    document.title = "Products | React Products"; // Set the document title for the products page
    headingRef.current?.focus(); // Focus the heading for accessibility when the page loads
  }, []);

  return (
    <>
      <header>
        <h1 ref={headingRef} tabIndex={-1}>
          Products
        </h1>
      </header>
      <main id="main-content">
        <ProductGrid />
      </main>
    </>
  );
}
