import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Popover from '../Popover';
import './styles.scss';

const TextEllipsis = ({ popoverProps, children }) => {
  const containerRef = React.useRef();
  const [truncated, setTruncated] = React.useState(false);

  React.useLayoutEffect(() => {
    const nextTruncateState = containerRef.current.scrollWidth > containerRef.current.clientWidth;

    if (truncated !== nextTruncateState) {
      setTruncated(nextTruncateState);
    }
  }, [truncated]);

  return (
    <Popover
      {...popoverProps}
      {...(truncated === false ? { triggers: 'disabled' } : {})}
      popoverContent={children}
      className="aui--text-ellipsis-wrapper"
    >
      <div data-testid="text-ellipsis" className="text-ellipsis-component" ref={containerRef}>
        {children}
      </div>
    </Popover>
  );
};

TextEllipsis.propTypes = {
  children: PropTypes.node.isRequired,
  popoverProps: PropTypes.shape(_.pick(Popover.propTypes, ['placement', 'trigger'])),
};

TextEllipsis.defaultProps = {
  popoverProps: {
    placement: 'top',
    trigger: 'hover',
  },
};

export default TextEllipsis;
