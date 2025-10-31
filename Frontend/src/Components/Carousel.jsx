import React, { useState, useEffect, useRef } from 'react';

const CarouselWrapper = ({ children, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState('right'); // 'right' means slide in from right
  const childrenCount = React.Children.count(children);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (childrenCount <= 1) return;

    timeoutRef.current = setInterval(() => {
      setDirection('right');
      setTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenCount);
    }, interval);

    return () => clearInterval(timeoutRef.current);
  }, [childrenCount, interval]);

  // Transition duration in milliseconds must match CSS
  const transitionDuration = 500;

  return (
    <div
      className="carousel-wrapper flex gap-3"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      {React.Children.map(children, (child, index) => {
        let translateX = '100%'; // start off-screen right

        const styles = {
          //   position: 'relative',
          display: index === currentIndex ? 'block' : 'none',
          //   top: 0,
          //   left: 0,
          //   width: '100%',
          //   height: '100%',
          //   transform: `translateX(${translateX})`,
          //   transition: `transform ${transitionDuration}ms ease-in-out`,
          //   pointerEvents: index === currentIndex ? 'auto' : 'none',
        };

        setTimeout(() => {}, interval);

        if (index === currentIndex)
          translateX = '0%'; // in view
        else if ((index + childrenCount - 1) % childrenCount === currentIndex)
          translateX = '-100%'; // just out to left (previous slide)

        return <div style={styles}>{child}</div>;
      })}
    </div>
  );
};

export default CarouselWrapper;
