import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from './data';
import styles from '../Style/checkout.module.css';
import axios from 'axios';

function Checkout() {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
  });

  if (!product) {
    return <h2 className={styles.notFound}>Product Not Found</h2>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const orderReference = `${timestamp}-${randomNum}`;

      const response = await axios.post("https://efrd.onrender.com/api/payment-process", {
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        price: product.price,
        reference: orderReference,
      });

      if (response.status === 200 && response.data.redirect_url) {
        window.location.href = response.data.redirect_url;
      } else {
        console.error("Error processing payment:", response.data);
      }
    } catch (error) {
      console.error("Payment request failed:", error);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <div className={styles.checkoutDetails}>
        <div className={styles.productSummary}>
          <h3>Order Summary</h3>
          <img src={product.image} alt={product.category} />
          <p className={styles.productName}>{product.category}</p>
          <p className={styles.price}>
            Total Price: <span>${product.price.toFixed(2)}</span>
          </p>
        </div>

        <form className={styles.checkoutForm} onSubmit={(e) => e.preventDefault()}>
          <label>Email:</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />

          <label>Phone Number:</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />

          <label>Delivery Address:</label>
          <input type="text" name="address" required value={formData.address} onChange={handleChange} />

          <button type="submit" className={styles.confirmButton} onClick={handlePayment}>
            Pay Now
          </button>
          <Link to={`/product/${id}`} className={styles.backButton}>Cancel</Link>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
