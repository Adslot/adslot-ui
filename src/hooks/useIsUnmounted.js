import React from 'react';

const useIsUnmounted = () => {
  const isUnmounted = React.useRef(false);

  React.useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  return React.useCallback(() => isUnmounted.current, []);
};

export default useIsUnmounted;
