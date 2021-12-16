import { useEffect, useState } from 'react';

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight * (window.visualViewport?.scale || 1),
    width: window.innerWidth * (window.visualViewport?.scale || 1),
  });

  useEffect(() => {
    const onResize = () => {
      setDimensions({
        height: window.innerHeight * (window.visualViewport?.scale || 1),
        width: window.innerWidth * (window.visualViewport?.scale || 1),
      });
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return dimensions;
}
