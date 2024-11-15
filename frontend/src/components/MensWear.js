import React, { useEffect, useState } from "react";
import axios from "axios";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "../styles/MensDemo.css"

const MensWear = () => {
  const [products, setProducts] = useState([]);
  const customerEmail=localStorage.getItem("userEmail")

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/category/mens%20ware")  // Replace with your API endpoint
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Limit to 5 products
  const limitedProducts = products;
  const addToCart = (productId) => {
    axios
    .post(`http://localhost:8080/api/cart/add?customerEmail=${customerEmail}&productId=${productId}&quantity=1`)
      .then((response) => {
        console.log("Product added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };
  return (
    <div>
<h1 className="text-center">Men's Wear</h1>
<div className="product-list" >
      
      {limitedProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrls} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
          <button className="cart-button" onClick={() => addToCart(product.productId)}>
              Add to Cart
            </button>
        </div>
      ))}
    </div>
    </div>
   
  );
};

export default MensWear;
