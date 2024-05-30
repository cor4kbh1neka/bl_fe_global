import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

export const Scroll = ({ targetElementId }) => {
    const [showScrollUp, setShowScrollUp] = useState(false);

    const handleScroll = () => {
      const container = document.querySelector('.container');
      const scrolled = container.scrollTop;
      const containerHeight = container.scrollHeight;
      const windowHeight = window.innerHeight;
  
      if (containerHeight > windowHeight) {
        if (scrolled > 0.5 * windowHeight) {
          setShowScrollUp(true);
        } else {
          setShowScrollUp(false);
        }
      } else {
        setShowScrollUp(false);
      }
    };
  
    useEffect(() => {
      const container = document.querySelector('.container');
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }, []);  

  return (
    <a href={`#${targetElementId}`} className={`scrollup ${showScrollUp ? 'show' : ''}`}>
      <Icon icon="solar:alt-arrow-up-bold-duotone" />
    </a>
  );
};

export default Scroll;
