import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "../styles/MensDemo.css";

const PLACEHOLDER_IMAGE = "/products/placeholder.svg";

/**
 * Shows the products of one category. With `limit`, it shows a preview and a "view more" link.
 */
const ProductList = ({ category, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const navigate = useNavigate();
  const customerEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/category/${encodeURIComponent(category.name)}`)
      .then((response) => setProducts(response.data))
      .catch(() => setError("Could not load products. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [category.name]);

  // Reset the "Added" label after a moment
  useEffect(() => {
    if (addedId === null) return undefined;
    const timer = setTimeout(() => setAddedId(null), 1500);
    return () => clearTimeout(timer);
  }, [addedId]);

  const addToCart = (productId) => {
    if (!customerEmail) {
      navigate("/login");
      return;
    }
    axios
      .post(`${API_BASE_URL}/api/cart/add`, null, {
        params: { customerEmail, productId, quantity: 1 },
      })
      .then(() => setAddedId(productId))
      .catch(() => setError("Could not add the product to your cart."));
  };

  const shown = limit ? products.slice(0, limit) : products;

  return (
    <section>
      <h1 className="text-center">{category.title}</h1>
      {loading && <p className="text-center">Loading products…</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center">No products in this category yet.</p>
      )}
      <div className="product-list" style={{ minHeight: limit ? undefined : "80vh" }}>
        {shown.map((product) => (
          <div key={product.productId} className="product-card">
            <img
              src={product.imageUrls?.[0] || PLACEHOLDER_IMAGE}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="product-price">₹{product.price.toFixed(2)}</div>
            <button className="cart-button" onClick={() => addToCart(product.productId)}>
              {addedId === product.productId ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        ))}
        {limit && products.length > limit && (
          <div className="product-card arrow-mark" onClick={() => navigate(category.path)}>
            <i className="fas fa-arrow-right"></i>
            <p>View more products</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
