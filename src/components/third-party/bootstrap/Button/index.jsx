/* eslint-disable react/prop-types */
// disable proptypes check because it doens't take into consideration extended types
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BootstrapButton from 'react-bootstrap/lib/Button';
import BootstrapPopover from 'react-bootstrap/lib/Popover';
import BootstrapOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Spinner from 'alexandria/Spinner';
import { expandDts } from 'lib/utils';
import './styles.scss';

const adslotButtonPropTypes = {
  inverse: PropTypes.bool,
  reason: PropTypes.string,
  dts: PropTypes.string,
  isLoading: PropTypes.bool,
};

class Button extends React.PureComponent {
  renderSpinner() {
    if (this.props.isLoading) {
      return (
        <div className="spinner-container">
          <Spinner size={_.includes(['lg', 'large'], this.props.bsSize) ? 'medium' : 'small'} />
        </div>
      );
    }

    return null;
  }

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
    const { inverse, children, dts, className, isLoading, disabled } = this.props;
    const classes = classNames('button-component', className, {
      'btn-inverse': inverse && !/btn-inverse/.test(className),
    });

    return (
      <BootstrapButton
        {..._.omit(this.props, _.keys(adslotButtonPropTypes))}
        disabled={isLoading || disabled}
        className={classes}
        {...expandDts(dts)}
      >
        {this.renderSpinner()}
        <div className={isLoading ? 'button-component-children-container' : null}>{children}</div>
      </BootstrapButton>
    );
  }

  render() {
    const { disabled, reason } = this.props;
    return disabled && reason ? this.renderWithReason() : this.renderButton();
  }
}

Button.propTypes = _.assign({}, adslotButtonPropTypes, BootstrapButton.propTypes);

Button.defaultProps = {
  inverse: false,
  isLoading: false,
};

export default Button;
