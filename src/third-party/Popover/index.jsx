import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapPopover from 'react-bootstrap/lib/Popover';

export const themes = ['light', 'dark', 'warn', 'error'];

class Popover extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(themes),
    className: PropTypes.string,
  };

  render() {
    const { theme, children, className, ...restProps } = this.props;

    const themeClass = _.includes(themes, theme) ? `popover-${theme}` : 'popover-light';

    const popoverClassName = [className, themeClass].join(' ').trim();

    return (
      <BootstrapPopover className={popoverClassName} {...restProps}>
        {children}
      </BootstrapPopover>
    );
  }
}

Popover.defaultProps = {
  theme: 'light',
};

export default Popover;
