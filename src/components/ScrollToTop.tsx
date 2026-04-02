import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the very top with an instant jump to ensure a clean start
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
