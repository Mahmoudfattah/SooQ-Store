import React from 'react'
import Slider from "react-slick"; // تأكد من استيراد Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../Assets/images/sldr1.jpg'
import slider2 from '../../Assets/images/sldr2.jpg'
import slider3 from '../../Assets/images/checkout-button.jpg'

import slider4 from '../../Assets/images/grocery-banner.png'
import slider5 from '../../Assets/images/grocery-banner-2.jpeg'


export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,

         speed: 3099,

      
        slidesToShow: 1,
        arrows :false,
        slidesToScroll: 1,
        autoplay:true
      };
         
  return   <>
    <div className="container mt-5">
        <div className="row gx-0 ">
        <div className="col-md-12 mt-5 mb-0 position-relative  ">
     <Slider {...settings} > 
        <title className='slider-title'>SHOP THE LOOK </title>
        <title className='slider-title2'>GRAB THE DEALS</title>
        <title className='slider-title3'>DON'T MISS OUT!!</title>
            {/* <img src={slider1} className='w-100 image-slider '   alt="sliderimage" />
            <img src={slider2} className='w-100 image-slider'   alt="sliderimage2" />
            <img src={slider3} className='w-100 image-slider'   alt="sliderimage3" /> */}
          
        
  
       </Slider> 
       {/* <h2 className='slider-h2'>Welcome, Again!</h2> */}
       </div>
       <div className="col-md-3 mt-5 slider">
       {/* <img src={slider4} className='w-100 one' style={{ height:200 ,objectFit: "cover"}}  alt="sliderimage4" />
       <img src={slider5} className='w-100 two' style={{ height:200 }}  alt="sliderimage5" /> */}
       </div>
       </div>
       </div>
       
  </>
}
