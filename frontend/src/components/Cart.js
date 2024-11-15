import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MensDemo.css";
import "../styles/Cart.css"

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
        .get(`http://localhost:8080/api/cart/products/${customerEmail}`)
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
      setError("No customer email found in session storage");
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
// Increment the quantity of a product, with a maximum limit of 5
const incrementQuantity = (index) => {
  const updatedItems = [...cartItems];
  if (updatedItems[index].quantity < 5) {
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    axios.put(`http://localhost:8080/api/cart/update`, {
      productId: updatedItems[index].productId, 
      quantity: updatedItems[index].quantity
    }).catch((error) => console.error('Error updating cart:', error));
  }
};

// Decrement the quantity of a product, with a minimum limit of 1
const decrementQuantity = (index) => {
  const updatedItems = [...cartItems];
  if (updatedItems[index].quantity > 0) {
    updatedItems[index].quantity -= 1;
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    axios.put(`http://localhost:8080/api/cart/update`, {
      productId: updatedItems[index].productId, 
      quantity: updatedItems[index].quantity
    }).catch((error) => console.error('Error updating cart:', error));
  }
};
  return (
    <div className="cart-container">
      <div className="cart-items" style={{ width: "70%", float: "left" }}>
        <h1 className="text-center">Cart Items</h1>
        <div className="product-list" style={{ minHeight: "80vh" }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={item.productId} className="product-card">
                <img
                  src={item.galleryUrl || "default-image.jpg"}
                  alt={item.productName}
                  className="product-image"
                />
                <div className="product-details">
                  <h2>{item.productName.trim()}</h2>
                  <p>{item.productDescription}</p>
                  <div className="product-price">
                    ${item.productPrice.toFixed(2)} x {item.quantity}
                  
                  </div>
                  <button className="bg-success"  onClick={() => incrementQuantity(index)} disabled={item.quantity >= 5}>+</button>
                      <button className="bg-alert"  onClick={() => decrementQuantity(index)} disabled={item.quantity <= 0}>-</button>                 
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
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
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
