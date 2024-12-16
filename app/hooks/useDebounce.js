import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // Cleanup timer on value or delay change
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
