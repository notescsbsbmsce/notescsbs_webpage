import { useCallback } from 'react';
import { useNavigate, NavigateOptions } from 'react-router-dom';

/**
 * Hook to enable smooth view transitions during navigation
 * Falls back to regular navigation on unsupported browsers
 */
export function useViewTransition() {
  const navigate = useNavigate();

  const transitionNavigate = useCallback(
    (to: string, options?: NavigateOptions) => {
      // Check if browser supports View Transitions API
      if (!document.startViewTransition) {
        navigate(to, options);
        return;
      }

      // Use View Transitions API for smooth transition
      document.startViewTransition(() => {
        navigate(to, options);
      });
    },
    [navigate]
  );

  return transitionNavigate;
}
