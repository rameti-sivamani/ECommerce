// HomePage.js
import React from 'react';
import SwiperDemo from './SwiperDemo';
import MensDemo from './MensDemo';
import WomensDemo from './WomensDemo';
import KidsDemo from './KidsDemo';
import "../styles/home.css"

const HomePage = () => {
  return (
    <div className="home">
      <header className="header">
        {/* Header content */}
      </header>
      <SwiperDemo />
      <MensDemo />
      <WomensDemo />
      <KidsDemo />
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default HomePage;
