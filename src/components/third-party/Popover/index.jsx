/* eslint-disable react/jsx-indent */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Manager, Reference } from 'react-popper';
import { themes, popoverPlacements } from './constants';
import WithRef from './WithRef';
import Popper from './Popper';
import './styles.scss';

const triggerPropTypes = PropTypes.oneOf(['click', 'hover', 'focus', 'disabled']);

class Popover extends React.PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf(themes),
    title: PropTypes.node,
    className: PropTypes.string,
    popoverClassNames: PropTypes.string,
    // arrow css styles, mainly for positioning the arrow
    arrowStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    wrapperStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    modifiers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    placement: PropTypes.oneOf(popoverPlacements),
    popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
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

  onClick = () => this.togglePopover();

  onFocus = () => this.openPopover();

  onBlur = () => this.closePopover();

  onMouseOver = () => this.openPopover();

  onMouseOut = () => this.closePopover();

  getBoundedContainer = () => (this.props.getContainer ? this.props.getContainer() : document.body);

  closePopover = () => this.setState({ isPopoverOpen: false });

  openPopover = () => this.setState({ isPopoverOpen: true });

  togglePopover = () => this.setState({ isPopoverOpen: !this.state.isPopoverOpen });

  referenceRef = React.createRef();

  render() {
    const { theme, title, children, className, dts, popoverClassNames, popoverContent } = this.props;
    const themeClass = _.includes(themes, theme) ? `popover-${theme}` : 'popover-light';
    const elementClass = classnames('aui--popover-element', className);
    const popoverClass = classnames('aui--popover-wrapper', themeClass, popoverClassNames);
    const triggers = _.flattenDeep([this.props.triggers]);

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
            placement={this.props.placement}
            modifiers={this.props.modifiers}
            boundariesElement={this.getBoundedContainer()}
            popoverClass={popoverClass}
            wrapperStyles={this.props.wrapperStyles}
            dts={dts}
            title={title}
            popoverContent={popoverContent}
            arrowStyles={arrowStyles}
            innerRef={this.props.popperRef}
          />,
          this.getBoundedContainer()
        )
      : null;

    return (
      <Manager>
        <Reference innerRef={this.referenceRef}>
          {({ ref }) => (
            <span
              className={elementClass}
              ref={ref}
              {...(triggers.includes('disabled')
                ? {}
                : {
                    ...(triggers.includes('click') ? { onClick: this.onClick } : {}),
                    ...(triggers.includes('hover')
                      ? { onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut }
                      : {}),
                    ...(triggers.includes('focus') ? { onFocus: this.onFocus, onBlur: this.onBlur } : {}),
                  })}
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

Popover.WithRef = WithRef;

export default Popover;
