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

  // Close filter menu when Escape key is pressed
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsFilterMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Extract unique categories from products and sort them alphabetically
  const categories = [...new Set(products.map(product => product.category))].sort((a, b) => a.localeCompare(b));

  // Filter products based on selected category and stock status
  const filteredProducts = products.filter(product => {
    const categoryMatches = selectedCategory === "all" || product.category === selectedCategory; // Check if product matches selected category
    const stockMatches = !inStockOnly || product.inStock; // Check if product is in stock if "In stock only" is checked
    return categoryMatches && stockMatches; // Include product if it matches both category and stock filters
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating-desc") return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
    if (sortBy === "rating-asc") return (a.rating?.rate ?? 0) - (b.rating?.rate ?? 0);
    return 0;
  });

  return (
    <>
      <button
        className={styles.openFilterButton}
        type="button"
        onClick={() => setIsFilterMenuOpen(true)}
        aria-controls="filter-drawer"
        aria-expanded={isFilterMenuOpen}>
        Filter
      </button>

      <button
        type="button"
        className={`${styles.overlay} ${isFilterMenuOpen ? styles.overlayVisible : ""}`}
        onClick={() => setIsFilterMenuOpen(false)}
      />

      <aside
        id="filter-drawer"
        className={`${styles.drawer} ${isFilterMenuOpen ? styles.drawerOpen : ""}`}
        aria-label="Filter menu">
        <div className={styles.drawerHeader}>
          <h2>Filter</h2>
          <button type="button" className={styles.closeButton} onClick={() => setIsFilterMenuOpen(false)}>
            Luk
          </button>
        </div>

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
              <option value="rating-asc">Rating: Low to high</option>
            </select>
          </label>
        </section>
      </aside>

      <p className={styles.resultCount} aria-live="polite">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      <section className={styles.grid} aria-label="Product list">
        {sortedProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
