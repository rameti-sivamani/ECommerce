import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../styles/Form.css"
const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data; // Get response data

      if (data.success) {
        alert("Login successful!");
        localStorage.setItem('userEmail', formData.email);
        sessionStorage.setItem('customerEmail',formData.email)
        onLogin(formData.email);
        navigate("/"); // Redirect to the home page
      } else {
        setErrorMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      
      setErrorMessage("Invalid Credentials !!!");
    }
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
    <div  style={containerStyle}>
      <Row>
        {/* Login Form */}
        <Col
          md={4}
          xs={12}
          style={{ border: "1px solid black", padding: "30px" }}
          className={"my-auto"}
        >
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <Form onSubmit={handleSubmit} className="mt-4">
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
                {/* View Password Button */}
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

            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}

            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                style={{ width: "70%", margin: "auto auto" }}
              >
                Login
              </Button>
            </div>

            <div className="mt-3 text-center">
              <p>
                Don't have an Account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
