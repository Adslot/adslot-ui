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
    trigger: PropTypes.oneOf(['click', 'hover', 'disabled']),
    isOpen: PropTypes.bool,
    boundToContainer: PropTypes.instanceOf(Element),
    popperRef: PropTypes.func,
    dts: PropTypes.string,
  };

  static defaultProps = {
    theme: 'light',
    placement: 'auto',
    trigger: 'hover',
    isOpen: false,
    boundToContainer: document.body, // default to bound to body
  };

  state = {
    isPopoverOpen: this.props.isOpen,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.trigger !== 'disabled') {
      return state;
    }

    return { isPopoverOpen: props.isOpen };
  }

  onClick = () => (this.props.trigger === 'click' ? this.togglePopover() : null);

  onMouseOver = () => (this.props.trigger === 'hover' ? this.openPopover() : null);

  onMouseOut = () => (this.props.trigger === 'hover' ? this.closePopover() : null);

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
              onFocus={_.noop}
              onMouseOut={this.onMouseOut}
              onBlur={_.noop}
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
