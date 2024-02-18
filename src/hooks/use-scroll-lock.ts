import { useEffect } from 'react';

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    document.body.className = lock ? 'scroll-lock' : '';
    return () => {
      document.body.className = '';
    };
  }, [lock]);
};

export default useScrollLock;
