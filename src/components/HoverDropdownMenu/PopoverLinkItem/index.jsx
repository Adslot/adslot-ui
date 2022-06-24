import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Anchor from '../../Anchor';
import Button from '../../Button';
import './styles.css';

class PopoverLinkItem extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { target, title, url, isEnabled, onClick } = this.props;

    const buttonProps = {
      disabled: !isEnabled,
      onClick,
      variant: 'link',
    };

    if (target !== '_modal') {
      _.assign(buttonProps, { href: url });
    }

    if (target === '_blank') {
      _.assign(buttonProps, { rel: 'noopener noreferrer' });
    }

    return (
      <li data-testid="popover-link-item-wrapper" className="popover-link-item">
        {buttonProps.href ? <Anchor {...buttonProps}>{title}</Anchor> : <Button {...buttonProps}>{title}</Button>}
      </li>
    );
  }
}

export const LINK_PROPS = {
  target: PropTypes.oneOf(['_blank', '_self', '_modal']),
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  isEnabled: PropTypes.bool,
};

PopoverLinkItem.propTypes = { onClick: PropTypes.func, ...LINK_PROPS };

PopoverLinkItem.defaultProps = {
  target: '_self',
  isEnabled: true,
  onClick: _.noop,
};

export default PopoverLinkItem;
