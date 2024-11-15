import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import MyNavbar from './components/Navbar';
import RegistrationForm from './components/Register';
import LoginForm from './components/Login';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Payment from './components/Payment';
import MensWear from './components/MensWear';
import WomensWear from './components/WomensWear';
import Help from './components/Help';
import NotFound from './components/NotFound';
import KidsWear from './components/KidsWear';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
         // Retrieve email from local storage
        if (email) {
            setIsLoggedIn(true);
            setUserEmail(email);
        }
    }, []);

    const handleLogin = (email) => {
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserEmail('');
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
            <Route path="/products/category/menswear" element={<MensWear />} />
            <Route path="/products/category/womenswear" element={<WomensWear />} />
            <Route path="/products/category/Kidswear" element={<KidsWear />} />

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
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/profile" element={<Navigate to="/login" replace />} />
            <Route path="/products/category/menswear" element={<Navigate to="/login" replace />} />
            <Route path="/products/category/womenswear" element={<Navigate to="/login" replace />} />
            <Route path="/cart" element={<Navigate to="/login" replace />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
            <Footer />
        </Router>
    );
};

export default App;
