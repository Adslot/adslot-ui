import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import SvgSymbol from 'components/alexandria/SvgSymbolComponent';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/adslotUi/HelpIconPopover.scss');

const HelpIconPopover = ({ children, id, placement }) => {
  const popover = (<Popover id={`popover-${id}`}>{children}</Popover>);

  // The <span> that wraps the <SvgSymbol> makes svg4everybody and overlay trigger to play nicely
  return (
    <span {...expandDts(id)} className="help-icon-popover-component">
      <OverlayTrigger trigger={['focus', 'hover']} placement={placement} overlay={popover}>
        <span><SvgSymbol classSuffixes={['help-icon']} href="/assets/svg-symbols.svg#help" /></span>
      </OverlayTrigger>
    </span>
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
