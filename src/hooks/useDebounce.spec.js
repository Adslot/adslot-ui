import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  const mockFunc = jest.fn();
  const wait = 500;
  const args = [1, 2, 3];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array containing four functions', () => {
    const { result } = renderHook(() => useDebounce(mockFunc, wait));

    expect(result.current).toHaveLength(3);
    expect(result.current[0]).toBeInstanceOf(Function);
    expect(result.current[1]).toBeInstanceOf(Function);
    expect(result.current[2]).toBeInstanceOf(Function);
  });

  it('should debounce the function call using the provided wait time', () => {
    const { result } = renderHook(() => useDebounce(mockFunc, wait));
    const [handleDebouncily] = result.current;

    act(() => {
      handleDebouncily(...args);
    });

    // Before debounce interval
    expect(mockFunc).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(wait - 1);
    });

    // During debounce interval
    expect(mockFunc).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    // After debounce interval
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc).toHaveBeenCalledWith(...args);
  });

  it('should immediately call the function and clear the debounce timer using flush', () => {
    const { result } = renderHook(() => useDebounce(mockFunc, wait));
    const [handleDebouncily, flush] = result.current;

    act(() => {
      handleDebouncily(...args);
      flush();
    });

    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc).toHaveBeenCalledWith(...args);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('should cancel the debounce timer using cancel', () => {
    const { result } = renderHook(() => useDebounce(mockFunc, wait));
    const [handleDebouncily, , cancel] = result.current;

    act(() => {
      handleDebouncily(...args);
      cancel();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(mockFunc).not.toHaveBeenCalled();
  });

  it('should clear the debounce timer on unmount', () => {
    const { result, unmount } = renderHook(() => useDebounce(mockFunc, wait));
    const [handleDebouncily] = result.current;

    act(() => {
      handleDebouncily(...args);
    });

    // Before unmount
    expect(mockFunc).not.toHaveBeenCalled();

    unmount();

    // After unmount
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(mockFunc).not.toHaveBeenCalled();
  });
});
