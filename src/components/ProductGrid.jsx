import { useEffect, useState } from "react";
import Product from "./Product";
import styles from "./ProductGrid.module.css";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const url = "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  // Get a sorted list of unique categories from the products data to populate the category filter dropdown
  const categories = [...new Set(products.map(product => product.category))].sort();

  const filteredProducts = products.filter(product => {
    const categoryMatches = selectedCategory === "all" || product.category === selectedCategory; // Show all categories if "all" is selected, otherwise filter by category
    const stockMatches = !inStockOnly || product.inStock; // If "in stock only" is checked, only show products that are in stock. If it's not checked, show all products regardless of stock status
    return categoryMatches && stockMatches;
  });

  // Sort the filtered products based on the selected sort option
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price); // Sort by price in ascending order (lowest to highest)
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price); // Sort by price in descending order (highest to lowest)
  } else if (sortBy === "rating-desc") {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate); // Sort by rating in descending order (highest to lowest)
  }

  return (
    <>
      <div className={styles.filterBar}>
        <button
          className={styles.openFilterButton}
          type="button"
          onClick={() => setIsFilterMenuOpen(true)}
          aria-controls="filter-drawer"
          aria-expanded={isFilterMenuOpen}>
          Filters
        </button>
      </div>

      <button
        type="button"
        className={`${styles.overlay} ${isFilterMenuOpen ? styles.overlayVisible : ""}`}
        onClick={() => setIsFilterMenuOpen(false)}
        aria-label="Close filter menu"
      />

      <aside
        id="filter-drawer"
        className={`${styles.drawer} ${isFilterMenuOpen ? styles.drawerOpen : ""}`}
        aria-label="Filter menu">
        <div className={styles.drawerHeader}>
          <h2>Filter products</h2>
          <button type="button" className={styles.closeButton} onClick={() => setIsFilterMenuOpen(false)}>
            Close
          </button>
        </div>
        <p className={styles.helperText}>Choose filters below to narrow the list.</p>

        <section className={styles.filters}>
          <label className={styles.filterField} htmlFor="category-filter">
            Category
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={event => setSelectedCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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

          <label className={styles.filterField} htmlFor="sort-filter">
            Sort by
            <select id="sort-filter" value={sortBy} onChange={event => setSortBy(event.target.value)}>
              <option value="none">Default</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating-desc">Rating: High to low</option>
            </select>
          </label>
        </section>

        <div className={styles.drawerActions}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={() => {
              setSelectedCategory("all");
              setInStockOnly(false);
              setSortBy("none");
            }}>
            Reset
          </button>
          <button type="button" className={styles.primaryCloseButton} onClick={() => setIsFilterMenuOpen(false)}>
            Show results
          </button>
        </div>
      </aside>

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
