import React from 'react';

const useCallbackRef = (callback) => {
  const ref = React.useRef(callback);

  React.useLayoutEffect(() => {
    ref.current = callback;
  });

  return ref;
};

export default useCallbackRef;
