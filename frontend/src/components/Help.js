import React from "react";
import "../styles/Help.css"; // Create this CSS file for styling

const Help = () => {
  return (
    <div className="help-container">
      <h1 className="text-center">Help Center</h1>
      <div className="help-section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li>
            <strong>How do I place an order?</strong>
            <p>To place an order, simply browse our products, add items to your cart, and proceed to checkout.</p>
          </li>
          <li>
            <strong>What payment methods do you accept?</strong>
            <p>We accept various payment methods including credit/debit cards, PayPal, and more.</p>
          </li>
          <li>
            <strong>How can I track my order?</strong>
            <p>Once your order is shipped, you will receive an email with a tracking number to monitor your delivery.</p>
          </li>
          <li>
            <strong>What is your return policy?</strong>
            <p>You can return any item within 30 days of receiving it, as long as it is in its original condition.</p>
          </li>
          <li>
            <strong>How can I contact customer support?</strong>
            <p>You can reach us through the contact form on our website or by emailing support@example.com.</p>
          </li>
        </ul>
      </div>
      <div className="help-section">
        <h2>Contact Us</h2>
        <p>If you have any further questions or need assistance, feel free to reach out:</p>
        <p>Email: support@example.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>
    </div>
  );
};

export default Help;
