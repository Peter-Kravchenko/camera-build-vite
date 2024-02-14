import { useEffect } from 'react';

const useModalFocus = (modalFocusRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const handleTabKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (modalFocusRef.current) {
          const focusableElements =
            modalFocusRef.current.querySelectorAll<HTMLAnchorElement>(
              'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
            );

          const firstElement = focusableElements[0];

          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleTabKeydown);
    return () => {
      document.removeEventListener('keydown', handleTabKeydown);
    };
  }, [modalFocusRef]);
};

export default useModalFocus;
