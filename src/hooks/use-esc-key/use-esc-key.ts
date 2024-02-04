import { useEffect } from 'react';

function useEscKey(onEscKey: () => void): void {
  useEffect(() => {
    const handleEscKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onEscKey();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onEscKey]);
}

export default useEscKey;
