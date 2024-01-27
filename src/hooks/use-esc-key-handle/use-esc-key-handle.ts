import { useEffect } from 'react';

function useEscKeyHandle(onEscKeyHandle: () => void): void {
  useEffect(() => {
    const handleEscKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onEscKeyHandle();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onEscKeyHandle]);
}

export default useEscKeyHandle;
