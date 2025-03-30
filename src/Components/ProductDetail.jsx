import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from './data';
import styles from '../Style/productdetails.module.css'; // Import CSS module

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <button className={styles.backButton} onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <img src={product.image} alt={product.category} />
        </div>
        <div className={styles.productInfo}>
          <h1>{product.category}</h1>
          <p className={styles.price}>Price: <span>${product.price.toFixed(2)}</span></p>
          <p className={styles.description}>
            Experience the best {product.category.toLowerCase()} with cutting-edge technology.
          </p>

          {/* Navigate to Checkout Page */}
          <button className={styles.buyButton} onClick={() => navigate(`/checkout/${product.id}`)}>
            Buy Now
          </button>

          <button className={styles.backButton} onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
