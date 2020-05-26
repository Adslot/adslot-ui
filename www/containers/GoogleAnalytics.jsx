import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const GA_TRACKING_ID = 'UA-18273448-24';

const GoogleAnalytics = ({ history, location }) => {
  useEffect(() => {
    const gtag = window.gtag;

    if (history.action === 'PUSH' && typeof gtag === 'function') {
      gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  });

  return null;
};

export default withRouter(GoogleAnalytics);
