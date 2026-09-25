import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MensDemo.css";
import "../styles/Cart.css";
import { API_BASE_URL } from "../config";

const MAX_QUANTITY = 5;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerAddress, setCustomerAddress] = useState("");
  const navigate = useNavigate();

  // Fetch cart products from the backend
  useEffect(() => {
    const customerEmail = localStorage.getItem("userEmail");
    if (customerEmail) {
      axios
        .get(`${API_BASE_URL}/api/cart/products/${encodeURIComponent(customerEmail)}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setCartItems(response.data);
            calculateTotalPrice(response.data);
          } else {
            setError("Unexpected response format.");
          }
          setCustomerAddress("123 Main St, Springfield, USA"); // Placeholder address, fetch/set as needed
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          setError("Error fetching cart items. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Please log in to see your cart.");
      setLoading(false);
    }
  }, []);

  
  
 

  // Calculate the total price of items in the cart
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + item.productPrice * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  // Handle the "Buy Now" button click or redirection if total price is zero
  const handleBuyNow = () => {
    if (totalPrice === 0) {
      navigate("/home"); // Redirect to home if total price is 0
    } else {
      navigate("/cart/buy/payment", { state: { totalPrice} });
     
    }
  };

  // Remove an item and recalculate the total price
 

  if (loading) {
    return <div className="text-center">Loading cart items...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }
// Change the quantity of a product. Quantity 0 removes it from the cart.
const changeQuantity = (productId, quantity) => {
  if (quantity > MAX_QUANTITY) {
    return;
  }
  const updatedItems = cartItems
    .map((item) => (item.productId === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  setCartItems(updatedItems);
  calculateTotalPrice(updatedItems);
  axios
    .put(`${API_BASE_URL}/api/cart/update`, {
      customerEmail: localStorage.getItem("userEmail"),
      productId,
      quantity,
    })
    .catch(() => setError("Could not update your cart. Please refresh the page."));
};
  return (
    <div className="cart-container">
      <div className="cart-items" style={{ width: "70%", float: "left" }}>
        <h1 className="text-center">Cart Items</h1>
        <div className="product-list" style={{ minHeight: "80vh" }}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="product-card">
                <img
                  src={item.galleryUrl || "/products/placeholder.svg"}
                  alt={item.productName}
                  className="product-image"
                />
                <div className="product-details">
                  <h2>{item.productName.trim()}</h2>
                  <p>{item.productDescription}</p>
                  <div className="product-price">
                    ₹{item.productPrice.toFixed(2)} x {item.quantity}
                  </div>
                  <button className="bg-success" onClick={() => changeQuantity(item.productId, item.quantity + 1)} disabled={item.quantity >= MAX_QUANTITY}>+</button>
                  <button className="bg-alert" onClick={() => changeQuantity(item.productId, item.quantity - 1)}>
                    {item.quantity === 1 ? "Remove" : "-"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">Your cart is empty.</div>
          )}
        </div>
      </div>

      <div className="cart-summary" style={{ width: "30%", float: "right", padding: "20px" }}>
        <h2 className="text-center">Summary</h2>
        <hr/>
        <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
        <h4>Delivery Address:</h4>
        <p>{customerAddress}</p>
        <button className="buy-now-button" onClick={handleBuyNow}>
          {totalPrice === 0 ? "Go For Products" : "Buy Now"}
        </button>
      </div>

      <div style={{ clear: "both" }}></div>
    </div>
  );
};

export default Cart;
