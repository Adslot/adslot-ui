import React from 'react';

/**
 * A custom React hook that debounces a given function and returns several methods for controlling the debounced behavior.
 * @param {function} func - The function to be debounced.
 * @param {number} wait - The wait time (in milliseconds) before the function is debounced.
 * @returns {[function, function, function]} - An array containing four functions:
 * - handleDebouncily: A function that will handle the debounced function call.
 * - flush: A function that will immediately call the debounced function and clear the debounce timer.
 * - cancel: A function that will cancel the debounce timer without calling the debounced function.
 */
export const useDebounce = (func, wait) => {
  const debounceRef = React.useRef({ timer: null, wait: null, func });
  debounceRef.current.wait = wait;
  debounceRef.current.func = func;

  const handleDebouncily = React.useCallback(
    (...args) => {
      if (debounceRef.current.timer) {
        clearTimeout(debounceRef.current.timer);
        debounceRef.current.timer = null;
      }
      debounceRef.current.args = args;
      debounceRef.current.timer = setTimeout(() => {
        debounceRef.current.timer = null;
        debounceRef.current.func(...args);
      }, debounceRef.current.wait);
    },
    [debounceRef]
  );

  const flush = React.useCallback(() => {
    if (debounceRef.current.timer) {
      clearTimeout(debounceRef.current.timer);
      debounceRef.current.timer = null;
    }
    debounceRef.current.func(...debounceRef.current.args);
  }, [debounceRef]);

  const cancel = React.useCallback(() => {
    if (debounceRef.current.timer) {
      clearTimeout(debounceRef.current.timer);
      debounceRef.current.timer = null;
    }
  }, [debounceRef]);

  React.useEffect(
    () => () => {
      if (debounceRef.current.timer) {
        clearTimeout(debounceRef.current.timer);
        debounceRef.current.timer = null;
      }
    },
    [debounceRef]
  );

  return [handleDebouncily, flush, cancel];
};
