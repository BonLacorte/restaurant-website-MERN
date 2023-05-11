import React, { useEffect, useState } from 'react';
import DashHeader from '../../components/DashHeader';
import backgroundImage1 from '../../img/background1.jpg';
import backgroundImage2 from '../../img/background2.jpg';
import backgroundImage3 from '../../img/background3.jpg';
import './LandingPage.css'; // Create a CSS file for custom styles


const imagePaths = [
    backgroundImage1,
    backgroundImage2,
    backgroundImage3
  ];
  
  const LandingPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % 5);
      }, 6000); // 6 seconds
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
      <div
        className="landing-page"
        style={{
            backgroundImage: imagePaths[currentImage],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'zoom-in 30s',
            height: '100vh',
            overflowY: 'scroll',
        }}
      >
        <DashHeader />
        {/* Add your content here */}
      </div>
    );
  };
  
  export default LandingPage;
  