import React from 'react';
import "../styles/Footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2>About Us</h2>
                    <p>Our Story</p>
                    <p>Careers</p>
                    <p>Blog</p>
                </div>

                <div className="footer-section">
                    <h2>Customer Service</h2>
                    <p>Help Center</p>
                    <p>Track Order</p>
                    <p>Returns & Refunds</p>
                    <p>Contact Us</p>
                </div>

                <div className="footer-section">
                    <h2>Policies</h2>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Shipping Policy</p>
                </div>

                <div className="footer-section">
                    <h2>Connect With Us</h2>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                    <p>YouTube</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ZipBuy. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
