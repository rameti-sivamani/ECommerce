import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import MyNavbar from './components/Navbar';
import RegistrationForm from './components/Register';
import LoginForm from './components/Login';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Help from './components/Help';
import NotFound from './components/NotFound';
import ProductList from './components/ProductList';
import { CATEGORIES } from './config';
const App = () => {
    // Read the saved login before the first render, so deep links and page refreshes
    // are not redirected to the login page.
    const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('userEmail')));

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
       // Clear email from session storage
       localStorage.removeItem('userEmail');
    };

    return (
        <Router>
            <MyNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />
            <Routes>
                 {/* Redirect if logged in, do not show login and register routes */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <Route key={key} path={category.path} element={<ProductList category={category} />} />
            ))}

            <Route path="/cart" element={<Cart />} />
            <Route path="/help" element={<Help />} />
            <Route path="/cart/buy/payment" element={<Payment />} />

            {/* Redirect logged in users trying to access login or register to home */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
          <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            {/* Redirect non-logged in users trying to access protected routes to login */}
            <Route path="/profile" element={<Navigate to="/login" replace />} />
            <Route path="/products/category/*" element={<Navigate to="/login" replace />} />
            <Route path="/cart" element={<Navigate to="/login" replace />} />
            <Route path="/cart/buy/payment" element={<Navigate to="/login" replace />} />
            <Route path="/help" element={<Navigate to="/login" replace />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
            <Footer />
        </Router>
    );
};

export default App;
