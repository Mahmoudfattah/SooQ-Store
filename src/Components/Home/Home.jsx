import React, { useEffect, useState } from 'react';

import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../Categories/CategorySlider';
import MainSlider from '../Categories/MainSlider';

export default function Home() {
  const [showButton, setShowButton] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 1000,
      behavior: 'smooth'
    });
  }
// for show or 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1900) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />


      {showButton && (
        <div className="text-center position-fixed bottom-0 end-0 m-4 z-3">
          <button className="top-button " onClick={scrollToTop}>
            Top↑
          </button>
        </div>
      )}
    </>
  );
}
