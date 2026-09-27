import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically scrolls the browser window to top (0,0) whenever a link is clicked
 * or the active URL / route changes.
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Temporarily set scrollBehavior to 'auto' to ensure instant reset to top on navigation
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // Restore smooth scroll for user interactions on the page
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior || '';
    });
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
