import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button,Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHome,faShoppingCart, faThLarge, faLifeRing, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome CSS
import { useNavigate } from 'react-router-dom';
const MyNavbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        setIsLoggedIn(false); 
        navigate("/login")
        // Update the login state to false on logout
    };
const navigate=useNavigate();
    return (
        <Navbar expand="lg" style={{ backgroundColor: '#4286f5', minHeight: '80px' }}>
            <Container>
                {/* Left side: Brand name */}
                <Navbar.Brand href="/" style={{ color: 'white', fontWeight: 'bold' }}>
                    <img
                        src="/logo.jpg"
                        alt="Brand Logo"
                        className="img-fluid"
                        style={{ maxWidth: '80px', mixBlendMode: 'multiply',    filter: 'grayscale(1)'}}
                    />
                </Navbar.Brand>

                <div className="mx-3" />

                {/* Search bar in between 
                    <Form className="d-flex ms-auto me-auto">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                        style={{ outline: 'none', boxShadow: 'none' }}
                    />
                    <Button variant="light" style={{ marginLeft: '-10px' }}>Search</Button>
                </Form>
 */}
           
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Right side: Menu items */}
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link onClick={()=>navigate("/")} style={{ color: 'white', marginRight: '15px' }}>
                                    <FontAwesomeIcon icon={faHome} /> Home
                                </Nav.Link>
                                <Dropdown>
            <Dropdown.Toggle variant="link" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faThLarge} /> Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>navigate("/products/category/menswear")}>Men's Wear</Dropdown.Item>
                <Dropdown.Item onClick={()=>navigate("/products/category/womenswear")}>Women's Ware</Dropdown.Item>
                <Dropdown.Item onClick={()=>navigate("/products/category/kidswear")}>Kid's Ware</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
                                <Nav.Link onClick={()=>navigate("/cart")} style={{ color: 'white', marginRight: '15px' }}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> Cart
                                </Nav.Link>
                                <Nav.Link onClick={()=>navigate("/help")} style={{ color: 'white', marginRight: '15px' }}>
                                    <FontAwesomeIcon icon={faLifeRing} /> Help
                                </Nav.Link>
                                <Nav.Link onClick={()=>navigate("/profile")} style={{ color: 'white', marginRight: '15px' }}>
                                    <FontAwesomeIcon icon={faUser} /> Profile
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout} style={{ color: 'white', marginRight: '15px' }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/register" style={{ color: 'white', marginRight: '15px' }}>
                                    <FontAwesomeIcon icon={faUserPlus} /> Register
                                </Nav.Link>
                                <Nav.Link href="/login" style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
