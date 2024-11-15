// SwiperDemo.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperDemo = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: 'https://i.pinimg.com/originals/de/f6/7a/def67a51cdbb2723cd7b07e4dc30fc0e.png',
      title: 'Big Sale on Men\'s Wear!',
      description: 'Get up to 50% off on selected items.',
      path: '/products/category/menswear', // Add path for navigation
    },
    {
      id: 2,
      image: 'https://images.all-free-download.com/images/graphiclarge/shopping_banner_design_with_lady_with_shopping_bags_6825851.jpg',
      title: 'New Arrivals in Women\'s Wear!',
      description: 'Explore the latest fashion trends.',
      path: '/products/category/womenswear', // Add path for navigation
    },
    {
      id: 3,
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cb919e124321033.61017d216b12f.jpg',
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
      style={{ minWidth: '100%', height: '70vh' }}
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id} onClick={() => handleSlideClick(slide.path)}>
          <div className="swiper-slide-content" style={{ cursor: 'pointer' }}>
            <img
              src={slide.image}
              alt={slide.title}
              style={{ width: '100%', height: 'auto' }}
              className="swiper-image"
            />
            <div className="swiper-text">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperDemo;
