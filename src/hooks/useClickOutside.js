import React from 'react';

const useClickOutside = (ref, handler) => {
  const savedCallback = React.useRef(handler);

  React.useEffect(() => {
    savedCallback.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      savedCallback.current(event);
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref]);
};

export default useClickOutside;
