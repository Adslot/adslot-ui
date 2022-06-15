import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';
import Popover from '../Popover';
import './styles.css';

const HelpIconPopover = ({ children, id, placement }) => (
  <div {...expandDts(id)} data-testid="help-icon-popover-wrapper" className="help-icon-popover-component">
    <Popover triggers={['hover']} placement={placement} popoverContent={children}>
      <div data-testid="help-icon-popover-trigger" className="help-icon-popover-component-trigger" />
    </Popover>
  </div>
);

HelpIconPopover.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

HelpIconPopover.defaultProps = {
  placement: 'right',
};

export default HelpIconPopover;
