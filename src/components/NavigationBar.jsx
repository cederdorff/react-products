import { NavLink } from "react-router";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <NavLink to="/" className={styles.link}>
        Home
      </NavLink>
      <NavLink to="/products" className={styles.link}>
        Products
      </NavLink>
    </nav>
  );
}
