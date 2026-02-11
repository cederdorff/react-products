import { useEffect, useRef } from "react";
// import styles from "./HomePage.module.css";

export default function HomePage() {
  const headingRef = useRef(null);

  useEffect(() => {
    document.title = "Home | React Products";
    headingRef.current?.focus();
  }, []);

  return (
    <>
      <header>
        <h1 ref={headingRef} tabIndex={-1}>
          Home Page
        </h1>
      </header>
      <main>
        <h2>Welcome to the Home Page</h2>
        <p>This is the main landing page of the application.</p>
      </main>
    </>
  );
}
