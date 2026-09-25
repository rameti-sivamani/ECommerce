// SwiperDemo.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper.css';

const SwiperDemo = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: '/banners/mens.svg',
      title: 'Big Sale on Men\'s Wear!',
      description: 'Get up to 50% off on selected items.',
      path: '/products/category/menswear', // Add path for navigation
    },
    {
      id: 2,
      image: '/banners/womens.svg',
      title: 'New Arrivals in Women\'s Wear!',
      description: 'Explore the latest fashion trends.',
      path: '/products/category/womenswear', // Add path for navigation
    },
    {
      id: 3,
      image: '/banners/kids.svg',
      title: 'Kids Wear Sale!',
      description: 'Great deals on kids clothing.',
      path: '/products/category/kidswear', // Add path for navigation
    },
    // Add more slides as needed
  ];

  const handleSlideClick = (path) => {
    navigate(path); // Navigate to the respective path
  };

  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000, // Adjust delay for automatic swiping
        disableOnInteraction: false, // Allow swiping while interacting
      }}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      className="swiper-container"
      style={{ minWidth: '100%', height: '60vh' }}
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id} onClick={() => handleSlideClick(slide.path)}>
          <div className="swiper-slide-content" style={{ cursor: 'pointer' }}>
            <img
              src={slide.image}
              alt={`${slide.title} ${slide.description}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="swiper-image"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperDemo;
