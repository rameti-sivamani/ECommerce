import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Payment.css"; // Ensure this CSS file exists for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const Payment = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0; // Get totalPrice from the passed state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  // Validate card number
  const validateCardNumber = (number) => {
    const regex = /^\d{16}$/; // Basic validation for 16 digits
    return regex.test(number);
  };

  // Validate expiry date
  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    return regex.test(date);
  };

  // Validate CVV
  const validateCVV = (cvv) => {
    const regex = /^\d{3}$/; // 3 digits
    return regex.test(cvv);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Reset error message
    setError("");

    // Validation checks
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      setError("Card number must be 16 digits.");
      return;
    }
    if (!validateExpiryDate(expiryDate)) {
      setError("Expiry date must be in MM/YY format.");
      return;
    }
    if (!validateCVV(cvv)) {
      setError("CVV must be 3 digits.");
      return;
    }

    // Simulate a payment process
    setTimeout(() => {
      setIsPaymentSuccess(true);
      setError(""); // Clear any previous errors
      // Optionally, clear the form fields
      setCardNumber("");
      setCardHolder("");
      setExpiryDate("");
      setCvv("");
    }, 1000); // Simulate a delay for payment processing
  };

  return (
    <div className="payment-container" >
      {isPaymentSuccess ? (
        <div className="pay-success" >
                      <FontAwesomeIcon className="i" icon={faCheckCircle} style={{ color: 'blue', marginRight: '8px' }} />

             <h2 className="text-center">Payment Done Successfully!</h2></div>
       
      ) : (
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <h1 className="text-center">Payment Details</h1>
          <hr></hr>
          <h3 className="text-center">Total Amount: ${totalPrice.toFixed(2)}</h3>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label>Card Number:</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Card Holder Name:</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Expiry Date (MM/YY):</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>CVV:</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Payment</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
