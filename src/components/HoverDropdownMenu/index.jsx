import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import PopoverLinkItem from './PopoverLinkItem';
import './styles.scss';

export class HoverDropdownMenuComponent extends React.PureComponent {
  static propTypes = {
    /**
     * Determine the placement of the popover
     */
    arrowPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * If set to empty string, header will not be rendered.
     */
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

    this.popperNode = null;

    this.closeMenu = _.debounce(() => {
      if (!this.state.mouseInPopover) {
        this.setState({
          isOpen: false,
        });
      }
    }, 100);
  }

  state = {
    isOpen: true,
    mouseInPopover: false,
  };

  componentDidUpdate() {
    if (this.popperNode) {
      this.popperNode.addEventListener('mouseenter', this.popoverEnterHandler);
      this.popperNode.addEventListener('mouseleave', this.popoverLeaveHandler);
    }
  }

  openMenu = () => {
    this.setState({
      isOpen: true,
      mouseInPopover: false,
    });
  };

  popoverEnterHandler = () => {
    this.setState({
      mouseInPopover: true,
    });
  };

  popoverLeaveHandler = () => {
    this.setState({ mouseInPopover: false }, this.closeMenu);
  };

  innerRefFunc = node => {
    this.popperNode = node;
  };

  render() {
    const { arrowPosition, headerText, hoverComponent, children } = this.props;

    const element = (
      <div onMouseEnter={this.openMenu} onMouseLeave={this.closeMenu}>
        {hoverComponent}
      </div>
    );

    return (
      <div className="hover-dropdown">
        {children && children.length > 0 ? (
          <Popover
            placement={`bottom-${arrowPosition === 'left' ? 'start' : 'end'}`}
            triggers={['disabled']}
            isOpen={this.state.isOpen}
            title={headerText}
            popoverContent={<ul className="list-unstyled">{children}</ul>}
            onMouseEnter={this.openMenu}
            popperRef={this.innerRefFunc}
          >
            {element}
          </Popover>
        ) : null}
      </div>
    );
  }
}

HoverDropdownMenuComponent.Item = PopoverLinkItem;

export default HoverDropdownMenuComponent;
