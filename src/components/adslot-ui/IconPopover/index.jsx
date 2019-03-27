import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { expandDts } from 'lib/utils';
import { Popover } from 'third-party';

import './styles.scss';

const IconPopover = iconName => ({ children, id, placement, theme }) => {
  const popover = (
    <Popover id={`popover-${id}`} theme={theme}>
      {children}
    </Popover>
  );
  const comonentName = `${iconName}-icon-popover-component`;

  return (
    <div {...expandDts(id)} className={comonentName}>
      <OverlayTrigger trigger={['focus', 'hover']} placement={placement} overlay={popover}>
        <div className={`${comonentName}-trigger`} />
      </OverlayTrigger>
    </div>
  );
};

IconPopover.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  theme: PropTypes.oneOf(Popover.themes),
};

IconPopover.defaultProps = {
  placement: 'right',
  theme: 'light',
};

export default IconPopover;
