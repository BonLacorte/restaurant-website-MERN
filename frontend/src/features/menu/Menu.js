import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect((direction) => {
    if (menuContainerRef.current) {
      setContainerWidth(menuContainerRef.current.offsetWidth);
    }
  }, []);
  
  const handleScroll = (direction) => {
    const container = menuContainerRef.current;
    if (container) {
      if (direction === 'left') {
        container.scrollTo({
          left: scrollPosition - container.offsetWidth,
          behavior: 'smooth',
        });
        setScrollPosition(scrollPosition - container.offsetWidth);
      } else if (direction === 'right') {
        container.scrollTo({
          left: scrollPosition + container.offsetWidth,
          behavior: 'smooth',
        });
        setScrollPosition(scrollPosition + container.offsetWidth);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        ref={menuContainerRef}
        className="flex items-center space-x-6 overflow-x-auto mx-auto w-3/5"
      >
        {/* Food categories go here */}
        {/* Add as many category items as needed */}
        <div className="flex-shrink-0 flex items-center">
          <p>Category 1</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 2</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 3</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 1</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 2</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 3</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 1</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 2</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 3</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 1</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 2</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 3</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 1</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 2</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <p>Category 3</p>
        </div>
        {/* End of food categories */}
      </div>
      {scrollPosition > 0 && (
        <button
          className="ml-2 p-2 bg-gray-300 rounded-full"
          onClick={() => handleScroll('left')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {/* Display the right arrow icon only if there are more categories to show */}
      {/* Check if there are more categories to show based on your logic */}
      {scrollPosition < containerWidth && (
        <button
          className="ml-2 p-2 bg-gray-300 rounded-full"
          onClick={() => handleScroll('right')}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};

export default Menu