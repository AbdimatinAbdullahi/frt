import React from "react";
import styles from "../Style/Home.module.css"; // Import module CSS
import products from "./data";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Welcome to ElectroMart</h1>
        <p>Your one-stop shop for the latest gadgets & electronics</p>
        <button className={styles.shopButton}>Shop Now</button>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredProducts}>
        <h2>Featured Products</h2>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => navigate(`product/${product.id}`)}
            >
              <img src={product.image} alt={product.category} />
              <h3>{product.category}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
