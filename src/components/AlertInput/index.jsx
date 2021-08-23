import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import { popoverPlacements } from '../Popover/constants';
import './styles.scss';

export const baseClass = 'aui--alert-input';

export default class AlertInput extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    dts: PropTypes.string,
    disabled: PropTypes.bool,
    prefixAddon: PropTypes.node,
    suffixAddon: PropTypes.node,
    /**
     * <span>
     *   As <code>success</code> is assumed, and help is always displayed independently, the accepted pattern is to
     *  only use <code>warning</code> and <code>error</code> feedback states with this component. Otherwise leave
     *  type undefined for <code>success</code>.
     * </span>
     */
    alertStatus: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    /**
     * 'left', 'top', 'top-start', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'right'
     */
    popoverPlacement: PropTypes.oneOf(popoverPlacements),
    alertMessage: PropTypes.string,
    onValueChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    alertStatus: 'success',
    popoverPlacement: 'bottom',
  };

  state = {
    isFocused: false,
    isPopoverVisible: false,
  };

  componentRef = React.createRef();

  handleMouseEnter = () => {
    if (this.props.alertMessage) {
      this.setState({ isPopoverVisible: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ isPopoverVisible: false });
  };

  handleInputFocus = (event) => {
    event.target.select();
    this.setState({
      isFocused: true,
      isPopoverVisible: Boolean(this.props.alertMessage),
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleInputBlur = (event) => {
    this.setState({
      isFocused: false,
      isPopoverVisible: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const { dts, popoverPlacement, disabled, prefixAddon, suffixAddon, alertStatus, alertMessage, onValueChange } =
      this.props;

    const className = classnames(
      baseClass,
      {
        [alertStatus]: alertStatus,
        [`${baseClass}--focused`]: this.state.isFocused,
        [`${baseClass}--disabled`]: disabled,
      },
      this.props.className
    );
    const theme = alertStatus === 'warning' ? 'warn' : alertStatus;
    const shouldPopoverOpen = this.state.isPopoverVisible && !_.isEmpty(alertMessage);

    const inputProps = _.omit(this.props, [
      'dts',
      'prefixAddon',
      'suffixAddon',
      'alertStatus',
      'alertMessage',
      'onValueChange',
      'popoverPlacement',
    ]);

    return (
      <React.Fragment>
        <div
          data-testid="alert-input-wrapper"
          ref={this.componentRef}
          className={className}
          data-test-selector={dts}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {prefixAddon ? <span className={`${baseClass}__addon`}>{prefixAddon}</span> : null}

          <input
            {...{
              ...inputProps,
              className: `${baseClass}__input`,
              onChange: onValueChange,
              onFocus: this.handleInputFocus,
              onBlur: this.handleInputBlur,
            }}
          />

          {suffixAddon ? <span className={`${baseClass}__addon`}>{suffixAddon}</span> : null}
        </div>

        {shouldPopoverOpen && (
          <Popover.WithRef
            isOpen
            refElement={this.componentRef.current}
            placement={popoverPlacement}
            popoverClassNames={`${baseClass}__popover`}
            theme={theme}
            popoverContent={alertMessage}
          />
        )}
      </React.Fragment>
    );
  }
}
