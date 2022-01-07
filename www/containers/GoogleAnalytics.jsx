import React from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = 'UA-18273448-24';

const GoogleAnalytics = () => {
  const location = useLocation();

  React.useEffect(() => {
    const gtag = window.gtag;

    if (typeof gtag === 'function') {
      gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  return null;
};

export default GoogleAnalytics;
