import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import { expandDts } from 'lib/utils';

require('./styles.scss');

const HelpIconPopover = ({ children, id, placement }) => {
  const popover = (<Popover id={`popover-${id}`}>{children}</Popover>);

  return (
    <div {...expandDts(id)} className="help-icon-popover-component">
      <OverlayTrigger trigger={['focus', 'hover']} placement={placement} overlay={popover}>
        <div className="help-icon-popover-component-trigger"></div>
      </OverlayTrigger>
    </div>
  );
};

HelpIconPopover.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
};

HelpIconPopover.defaultProps = {
  placement: 'right',
};

export default HelpIconPopover;
