import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../Button';
import './styles.scss';

class PopoverLinkItemComponent extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { target, title, url, isEnabled, onClick } = this.props;

    const buttonProps = {
      disabled: !isEnabled,
      onClick,
      theme: 'link',
    };

    if (target !== '_modal') {
      _.assign(buttonProps, { href: url });
    }

    if (target === '_blank') {
      _.assign(buttonProps, { rel: 'noopener noreferrer' });
    }

    return (
      <li data-testid="popover-link-item-wrapper" className="popover-link-item">
        <Button {...buttonProps}>{title}</Button>
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

PopoverLinkItemComponent.propTypes = _.assign({ onClick: PropTypes.func }, LINK_PROPS);

PopoverLinkItemComponent.defaultProps = {
  target: '_self',
  isEnabled: true,
  onClick: _.noop,
};

export default PopoverLinkItemComponent;
