import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from 'react-bootstrap';
import { Popover } from 'third-party';
import PopoverLinkItem from './PopoverLinkItem';
import './styles.scss';

// if change this, change the width in styles.scss too
const POPOVER_WIDTH = 160;

/* eslint-disable react/prop-types */
export const renderPopoverComponent = arrowPosition => props => {
  // default offset is 50%, therefore to adjust to align with the arrow, we need to move back/forth 30%
  const popoverOffset = POPOVER_WIDTH * 0.3;
  const popoverProps = _.assign({}, props, {
    arrowOffsetLeft: arrowPosition === 'left' ? '20%' : '80%',
    style: {
      left: arrowPosition === 'left' ? props.style.left + popoverOffset : props.style.left - popoverOffset,
    },
  });

  return <Popover {...popoverProps} />;
};
/* eslint-enable react/prop-types */

export class HoverDropdownMenuComponent extends React.Component {
  static propTypes = {
    arrowPosition: PropTypes.oneOf(['left', 'right']),
    headerText: PropTypes.string,
    hoverComponent: PropTypes.element.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    arrowPosition: 'left',
    headerText: '',
  };

  constructor(props) {
    super(props);

    this.element = React.createRef();

    this.closeMenu = _.debounce(() => {
      if (!this.state.mouseInPopover) {
        this.setState({
          isOpen: false,
        });
      }
    }, 100);
  }

  state = {
    isOpen: false,
    target: null,
    mouseInPopover: false,
  };

  componentDidMount() {
    // prevent default title popup if exists, assuming the first child is the hoverComponent
    this.element.current.childNodes[0].removeAttribute('title');
  }

  openMenu = event => {
    this.setState({
      isOpen: true,
      target: event.target,
      mouseInPopover: false,
    });
  };

  popoverEnterHandler = () => {
    this.setState({ mouseInPopover: true });
  };

  popoverLeaveHandler = () => {
    this.setState({ mouseInPopover: false });
    this.closeMenu();
  };

  render() {
    const { arrowPosition, headerText, hoverComponent, children } = this.props;

    const HoverPopover = renderPopoverComponent(arrowPosition);

    return (
      <div className="hover-dropdown" ref={this.element} onMouseEnter={this.openMenu} onMouseLeave={this.closeMenu}>
        {hoverComponent}
        {children && children.length > 0 ? (
          <Overlay show={this.state.isOpen} target={this.state.target} placement="bottom">
            <HoverPopover
              id="hover-dropdown-popover"
              className="hover-dropdown-popover"
              onMouseEnter={this.popoverEnterHandler}
              onMouseLeave={this.popoverLeaveHandler}
              title={headerText}
            >
              <ul className="list-unstyled">{children}</ul>
            </HoverPopover>
          </Overlay>
        ) : null}
      </div>
    );
  }
}

HoverDropdownMenuComponent.Item = PopoverLinkItem;

export default HoverDropdownMenuComponent;
