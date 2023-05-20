import React from 'react';

const useKeydown = (key, callback) => {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === key) {
        callback([]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, key]);
};

export default useKeydown;
