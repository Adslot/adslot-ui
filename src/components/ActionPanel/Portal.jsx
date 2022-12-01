import React from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ targetEle, children }) => {
  const [target] = React.useState(() => {
    if (targetEle) return targetEle;

    const div = document.createElement('div');
    document.body.appendChild(div);
    return div;
  });

  React.useEffect(() => {
    return () => {
      window.requestAnimationFrame(() => {
        if (target.childNodes.length === 0) {
          target.remove();
        }
      });
    };
  }, [target]);

  return createPortal(children, target);
};

export default Portal;
