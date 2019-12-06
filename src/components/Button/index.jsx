/* eslint-disable react/prop-types */
// disable proptypes check because it doesn't take into consideration extended types
import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/lib/Button';
import Spinner from '../Spinner';
import { expandDts } from '../../lib/utils';
import Popover from '../Popover';
import './styles.scss';

const adslotButtonPropTypes = {
  inverse: PropTypes.bool,
  reason: PropTypes.node,
  dts: PropTypes.string,
  isLoading: PropTypes.bool,
};

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.state = {
      show: false,
    };
    this.handleReasonPopover = this.handleReasonPopover.bind(this);
  }

  handleReasonPopover(value) {
    this.setState({ show: value });
  }

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

  render() {
    const { inverse, children, dts, className, isLoading, disabled, reason } = this.props;
    const shouldShowReason = !!disabled && !!reason;
    const classes = classNames('button-component', className, {
      'btn-inverse': inverse && !/btn-inverse/.test(className),
    });
    const reasonProps = shouldShowReason
      ? {
          onMouseOver: () => this.handleReasonPopover(true),
          onMouseOut: () => this.handleReasonPopover(false),
        }
      : {};

    return (
      <BootstrapButton
        {..._.omit(this.props, _.keys(adslotButtonPropTypes))}
        disabled={isLoading || disabled}
        className={classes}
        {...expandDts(dts)}
        {...reasonProps}
        ref={this.buttonRef}
      >
        <Popover
          className="btn-popover-reason"
          wrapperClassName="btn-popover-wrapper"
          popoverContent={reason || ''}
          placement="bottom"
          isOpen={this.state.show}
          triggers={['disabled']}
        >
          {this.renderSpinner()}
          <div className={isLoading ? 'button-component-children-container' : null}>{children}</div>
        </Popover>
      </BootstrapButton>
    );
  }
}

Button.propTypes = _.assign({}, adslotButtonPropTypes, BootstrapButton.propTypes);

Button.defaultProps = {
  inverse: false,
  isLoading: false,
};

export default Button;
