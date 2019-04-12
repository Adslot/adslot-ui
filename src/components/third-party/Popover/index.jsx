/* eslint-disable react/jsx-indent */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import { themes, popoverPlacements } from './constants';
import './styles.scss';

const triggerPropTypes = PropTypes.oneOf(['click', 'hover', 'focus', 'disabled']);

class Popover extends React.PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf(themes),
    title: PropTypes.node,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    // arrow css styles, mainly for positioning the arrow
    arrowStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    placement: PropTypes.oneOf(popoverPlacements),
    popoverContent: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    triggers: PropTypes.oneOfType([triggerPropTypes, PropTypes.arrayOf(triggerPropTypes)]),
    isOpen: PropTypes.bool,
    getContainer: PropTypes.func,
    popperRef: PropTypes.func,
    dts: PropTypes.string,
  };

  static defaultProps = {
    theme: 'light',
    placement: 'auto',
    triggers: 'hover',
    isOpen: false,
  };

  state = {
    isPopoverOpen: this.props.isOpen,
  };

  static getDerivedStateFromProps(props, state) {
    const triggers = _.flattenDeep([props.triggers]);
    if (!triggers.includes('disabled')) {
      return state;
    }

    return { isPopoverOpen: props.isOpen };
  }

  onClick = () => {
    const triggers = _.flattenDeep([this.props.triggers]);
    return !triggers.includes('disabled') && triggers.includes('click') ? this.togglePopover() : null;
  };

  onFocus = () => {
    const triggers = _.flattenDeep([this.props.triggers]);
    return !triggers.includes('disabled') && triggers.includes('focus') ? this.openPopover() : null;
  };

  onBlur = () => {
    const triggers = _.flattenDeep([this.props.triggers]);
    return !triggers.includes('disabled') && triggers.includes('focus') ? this.closePopover() : null;
  };

  onMouseOver = () => {
    const triggers = _.flattenDeep([this.props.triggers]);
    return !triggers.includes('disabled') && triggers.includes('hover') ? this.openPopover() : null;
  };

  onMouseOut = () => {
    const triggers = _.flattenDeep([this.props.triggers]);
    return !triggers.includes('disabled') && triggers.includes('hover') ? this.closePopover() : null;
  };

  getBoundedContainer = () => (this.props.getContainer ? this.props.getContainer() : document.body);

  closePopover = () => this.setState({ isPopoverOpen: false });

  openPopover = () => this.setState({ isPopoverOpen: true });

  togglePopover = () => this.setState({ isPopoverOpen: !this.state.isPopoverOpen });

  referenceRef = React.createRef();
  popperRef = this.props.popperRef || React.createRef();

  render() {
    const { theme, title, children, className, dts, wrapperClassName, popoverContent } = this.props;
    const themeClass = _.includes(themes, theme) ? `popover-${theme}` : 'popover-light';
    const contentClassNames = classnames('aui--popover-container', className);
    const popoverClassNames = classnames('aui--popover-wrapper', themeClass, wrapperClassName);
    let arrowStyles = {};
    switch (true) {
      case _.includes(['bottom-start', 'top-start'], this.props.placement):
        arrowStyles = { left: 12 };
        break;
      case _.includes(['bottom-end', 'top-end'], this.props.placement):
        arrowStyles = { left: 'auto', right: 12 };
        break;
      default:
        arrowStyles = {};
    }
    arrowStyles = { ...arrowStyles, ...this.props.arrowStyles }; // let user override default configuration

    const popoverElement = this.state.isPopoverOpen
      ? ReactDOM.createPortal(
          <Popper
            innerRef={this.popperRef}
            placement={this.props.placement}
            modifiers={{
              preventOverflow: {
                enabled: true,
                boundariesElement: this.getBoundedContainer(),
              },
            }}
          >
            {({ ref, style, placement, arrowProps }) => (
              <div
                className={popoverClassNames}
                ref={ref}
                style={style}
                data-placement={placement}
                data-test-selector={dts}
              >
                <div className={contentClassNames}>
                  {title ? <div className="popover-title">{title}</div> : null}
                  <div className="popover-content">{popoverContent}</div>
                </div>
                <div
                  className="aui--popover-arrow"
                  data-placement={placement}
                  ref={arrowProps.ref}
                  style={{ ...arrowProps.style, ...arrowStyles }}
                />
              </div>
            )}
          </Popper>,
          this.getBoundedContainer()
        )
      : null;

    return (
      <Manager>
        <Reference innerRef={this.referenceRef}>
          {({ ref }) => (
            <span
              className="aui--popover-element"
              ref={ref}
              onClick={this.onClick}
              onMouseOver={this.onMouseOver}
              onFocus={this.onFocus}
              onMouseOut={this.onMouseOut}
              onBlur={this.onBlur}
            >
              {children}
            </span>
          )}
        </Reference>

        {popoverElement}
      </Manager>
    );
  }
}

export default Popover;
