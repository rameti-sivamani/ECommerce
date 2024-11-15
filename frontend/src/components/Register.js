import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../styles/Form.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = [];
    
    // Validate First Name
    if (!formData.firstName || !/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.push("First name is required and should only contain letters.");
    }

    // Validate Last Name
    if (!formData.lastName || !/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.push("Last name is required and should only contain letters.");
    }

    // Validate Phone Number (Example: 10 digits)
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      errors.push("Phone number must be 10 digits.");
    }

    // Validate Email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Please enter a valid email address.");
    }

    // Validate Password
    if (!formData.password || formData.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    // Validate Date of Birth (Must be at least 18 years old)
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
   

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, do not proceed
    }

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phoneNumber,
      gender: formData.gender,
      email: formData.email,
      password: formData.password,
      date_of_birth: formData.dateOfBirth,
      active: 1,
    };

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          alert("Registration successful!");
        } else {
          alert("User Already exists with this Email Address");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error during registration.");
      });
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: "50px 0",

    backgroundImage: "url(/bg-register.jpg)", // Path to your background image in the public directory
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    color: "#fff",
  };

  return (
    <div style={containerStyle}>
      <div className="form-bg" style={{ minWidth: '500px' }}>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        {errorMessages.length > 0 && (
          <div className="alert alert-danger">
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <Form onSubmit={handleSubmit} className="mt-4">
          <Row>
            <Col md={12}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={12}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye} // Toggle between eye and eye-slash
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              />
            </div>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              style={{ width: "70%", margin: "auto auto" }}
            >
              Register
            </Button>
          </div>

          <div className="mt-3 text-center">
            <p>
              Already have an Account?{" "}
              <a href="/login" style={{ textDecoration: "none" }}>
                Login
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
