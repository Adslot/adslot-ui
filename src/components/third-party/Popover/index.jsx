/* eslint-disable react/jsx-indent */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import { themes, popoverPlacements } from './constants';
import './styles.scss';

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
    triggers: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus', 'disabled'])),
    isOpen: PropTypes.bool,
    boundToContainer: PropTypes.instanceOf(Element),
    popperRef: PropTypes.func,
    dts: PropTypes.string,
  };

  static defaultProps = {
    theme: 'light',
    placement: 'auto',
    triggers: ['hover'],
    isOpen: false,
    boundToContainer: document.body, // default to bound to body
  };

  state = {
    isPopoverOpen: this.props.isOpen,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.triggers.includes('disabled')) {
      return state;
    }

    return { isPopoverOpen: props.isOpen };
  }

  onClick = () => {
    const { triggers } = this.props;
    return !triggers.includes('disabled') && triggers.includes('click') ? this.togglePopover() : null;
  };

  onFocus = () => {
    const { triggers } = this.props;
    return !triggers.includes('disabled') && triggers.includes('focus') ? this.openPopover() : null;
  };

  onBlur = () => {
    const { triggers } = this.props;
    return !triggers.includes('disabled') && triggers.includes('focus') ? this.closePopover() : null;
  };

  onMouseOver = () => {
    const { triggers } = this.props;
    return !triggers.includes('disabled') && triggers.includes('hover') ? this.openPopover() : null;
  };

  onMouseOut = () => {
    const { triggers } = this.props;
    return !triggers.includes('disabled') && triggers.includes('hover') ? this.closePopover() : null;
  };

  closePopover = () => this.setState({ isPopoverOpen: false });

  openPopover = () => this.setState({ isPopoverOpen: true });

  togglePopover = () => this.setState({ isPopoverOpen: !this.state.isPopoverOpen });

  referenceRef = React.createRef();
  popperRef = this.props.popperRef || React.createRef();

  render() {
    const { arrowStyles, theme, title, children, className, dts, wrapperClassName, popoverContent } = this.props;
    const themeClass = _.includes(themes, theme) ? `popover-${theme}` : 'popover-light';
    const contentClassNames = classnames('aui--popover-container', className);
    const popoverClassNames = classnames('aui--popover-wrapper', themeClass, wrapperClassName);

    const popoverElement = this.state.isPopoverOpen
      ? ReactDOM.createPortal(
          <Popper innerRef={this.popperRef} placement={this.props.placement}>
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
                  className="popover-arrow"
                  data-placement={placement}
                  ref={arrowProps.ref}
                  style={{ ...arrowProps.style, ...arrowStyles }}
                />
              </div>
            )}
          </Popper>,
          this.props.boundToContainer
        )
      : null;

    return (
      <Manager>
        <Reference innerRef={this.referenceRef}>
          {({ ref }) => (
            <span
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
