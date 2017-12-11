/* eslint-disable react/prop-types */
// disable proptypes check because it doens't take into consideration extended types
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BootstrapButton from 'react-bootstrap/lib/Button';
import BootstrapPopover from 'react-bootstrap/lib/Popover';
import BootstrapOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { expandDts } from 'lib/utils';

class Button extends React.PureComponent {
  renderWithReason() {
    const popover = (
      <BootstrapPopover id="btn-reason" className="btn-popover-reason">
        {this.props.reason}
      </BootstrapPopover>
    );
    return (
      <BootstrapOverlayTrigger trigger={['focus', 'hover']} placement="bottom" overlay={popover}>
        {this.renderButton()}
      </BootstrapOverlayTrigger>
    );
  }

  renderButton() {
    const { inverse, children, dts, className } = this.props;

    return (
      <BootstrapButton
        {..._.pick(this.props, _.keys(BootstrapButton.propTypes))}
        className={classNames(className, { 'btn-inverse': inverse && !/btn-inverse/.test(className) })}
        {...expandDts(dts)}
      >
        {children}
      </BootstrapButton>
    );
  }

  render() {
    const { disabled, reason } = this.props;
    return disabled && reason ? this.renderWithReason() : this.renderButton();
  }
}

Button.propTypes = _.assign(
  {
    inverse: PropTypes.bool,
    reason: PropTypes.string,
    dts: PropTypes.string,
  },
  BootstrapButton.propTypes
);

Button.defaultProps = {
  inverse: false,
};

export default Button;
