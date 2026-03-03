import { useEffect, useState } from "react";
import Product from "./Product";
import styles from "./ProductGrid.module.css";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    async function fetchProducts() {
      const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category))].sort();

  const filteredProducts = products.filter(product => {
    const matchesSelectedCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesStockFilter = inStockOnly === false || product.inStock === true;
    return matchesSelectedCategory && matchesStockFilter;
  });

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating-desc") {
    filteredProducts.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
  }

  function resetFilters() {
    setSelectedCategory("all");
    setInStockOnly(false);
    setSortBy("none");
  }

  return (
    <>
      <section className={styles.filterPanel} aria-label="Product filters">
        <div className={styles.categorySection}>
          <p className={styles.categoryLabel}>Category</p>
          <div className={styles.categoryButtons}>
            <button
              type="button"
              className={`${styles.categoryButton} ${selectedCategory === "all" ? styles.activeCategoryButton : ""}`}
              onClick={() => setSelectedCategory("all")}
              aria-pressed={selectedCategory === "all"}>
              All categories
            </button>

            {categories.map(category => (
              <button
                key={category}
                type="button"
                className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategoryButton : ""}`}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterRow}>
          <label className={styles.filterField} htmlFor="sort-filter">
            Sort by
            <select id="sort-filter" value={sortBy} onChange={event => setSortBy(event.target.value)}>
              <option value="none">Default</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating-desc">Rating: High to low</option>
            </select>
          </label>

          <label className={styles.stockToggle} htmlFor="stock-filter">
            <input
              id="stock-filter"
              type="checkbox"
              checked={inStockOnly}
              onChange={event => setInStockOnly(event.target.checked)}
            />
            In stock only
          </label>

          <button type="button" className={styles.resetButton} onClick={resetFilters}>
            Reset
          </button>
        </div>
      </section>
      <p className={styles.resultCount} aria-live="polite">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      <section className={styles.grid} aria-label="Product list">
        {filteredProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
