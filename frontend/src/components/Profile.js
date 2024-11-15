import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css"
import { Col, Row } from "react-bootstrap";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      if (email) {
        try {
          // Change the URL to include the email as a query parameter
          const response = await axios.get(
            `http://localhost:8080/api/customer/profile?email=${email}`
          );
          console.log("Response from API: ", response); // Log the response object
          setCustomer(response.data); // Update state with the received customer data
          setLoading(false); // Set loading to false after fetching
        } catch (error) {
          console.error("Error fetching customer data:", error);
          setError("Failed to fetch customer data.");
          setLoading(false);
        }
      } else {
        console.error("No email found in sessionStorage");
        setError("Email not found in sessionStorage.");
        setLoading(false);
      }
    };

    fetchCustomerProfile();
  }, [email]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Row style={{margin:'0'}}>
       
        <Col>
        <div className="profile-container">
            <h1>Customer Profile</h1>
            <div className="profile-details">
                <div className="name-row">
                    <div className="name-item">
                        <label>First Name:</label>
                        <p>{customer.first_name}</p>
                    </div>
                    <div className="name-item">
                        <label>Last Name:</label>
                        <p>{customer.last_name}</p>
                    </div>
                </div>
                <div className="info-row">
                    <div>
                        <label>Email:</label>
                        <p>{customer.email}</p>
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <p>{customer.phone_number}</p>
                    </div>
                </div>
                <div className="info-row">
                    <div>
                        <label>Gender:</label>
                        <p>{customer.gender}</p>
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                        <p>{customer.date_of_birth}</p>
                    </div>
                </div>
            </div>
            <div className="profile-quotes">
                <h2>Quotes for You</h2>
                <p>“The best is yet to come!”</p>
                <p>“Believe in yourself, and you will be unstoppable.”</p>
                <p>“A customer is the most important visitor on our premises.”</p>
            </div>
        </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
