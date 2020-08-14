/* eslint-disable react/jsx-indent */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Manager, Reference } from 'react-popper';
import { themes, popoverPlacements } from './constants';
import WithRef from './WithRef';
import Popper from './Popper';
import './styles.scss';

const triggerPropTypes = PropTypes.oneOf(['click', 'hover', 'focus', 'disabled']);

class Popover extends React.PureComponent {
  static propTypes = {
    /**
     * PropTypes.oneOf(['light', 'dark', 'warn', 'error', 'info', 'success'])
     */
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
    // isPopoverOpen: false,
    // isForcedOpen: false,
  };

  static getDerivedStateFromProps(props, state) {
    const triggers = _.flattenDeep([props.triggers]);
    if (!triggers.includes('disabled')) {
      return state;
    }

    return { isPopoverOpen: props.isOpen };
  }

  // props isOpen is not working now, maybe refactor for
  // componentDidMount() {
  //   this.setState({ isForcedOpen: this.props.isOpen });
  // }

  // componentDidUpdate() {
  //   this.setState({ isForcedOpen: this.props.isOpen });
  // }

  onClick = () => this.togglePopover();

  onFocus = () => this.openPopover();

  onBlur = () => this.closePopover();

  onMouseOver = () => this.openPopover();

  onMouseOut = () => this.closePopover();

  getBoundedContainer = () => (this.props.getContainer ? this.props.getContainer() : document.body);

  closePopover = () => this.setState({ isPopoverOpen: false });

  openPopover = () => this.setState({ isPopoverOpen: true });

  togglePopover = () => this.setState(prevState => ({ isPopoverOpen: !prevState.isPopoverOpen }));

  referenceRef = React.createRef();

  elementRef = React.createRef();

  render() {
    const { theme, title, children, className, dts, popoverClassNames, popoverContent } = this.props;
    const themeClass = _.includes(themes, theme) ? `popover-${theme}` : 'popover-light';
    const elementClass = classnames('aui--popover-element', className);
    const popoverClass = classnames('aui--popover-wrapper', themeClass, popoverClassNames);
    const triggers = _.flattenDeep([this.props.triggers]);

    const popoverElement = this.state.isPopoverOpen // || this.state.isForcedOpen
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
            arrowStyles={this.props.arrowStyles}
            innerRef={this.props.popperRef}
            refElement={this.elementRef.current}
          />,
          this.getBoundedContainer()
        )
      : null;

    return (
      <Manager>
        <Reference innerRef={this.referenceRef}>
          {() => (
            <span
              data-testid="popover-element"
              className={elementClass}
              ref={this.elementRef}
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
