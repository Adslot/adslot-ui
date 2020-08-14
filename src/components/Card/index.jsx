import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const CardContent = ({ children, className, stretch, fill, append, dts }) => {
  const contentClassNames = classnames('card-component-content', { stretch, fill, append }, className);
  return (
    <div data-testid="card-content-wrapper" className={contentClassNames} {...expandDts(dts)}>
      {children}
    </div>
  );
};

CardContent.displayName = 'CardContentComponent';

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fill: PropTypes.bool,
  stretch: PropTypes.bool,
  append: PropTypes.bool,
  dts: PropTypes.string,
};

CardContent.defaultProps = {
  fill: false,
  stretch: false,
  append: false,
};

const Card = ({ children, className, accent, dts }) => {
  const baseClass = 'card-component';
  const containerClassNames = classnames(baseClass, { [`accent accent-${accent}`]: accent }, className);

  const nestedChildren = React.Children.map(children, (
    child // eslint-disable-line lodash/prefer-lodash-method
  ) => (!_.get(child, 'props.append') ? child : null));
  const appendedChildren = React.Children.map(children, (
    child // eslint-disable-line lodash/prefer-lodash-method
  ) => (_.get(child, 'props.append') ? child : null));

  return (
    <div data-testid="card-container-wrapper" className={containerClassNames} {...expandDts(dts)}>
      <div data-testid="card-content-container-wrapper" className={`${baseClass}-content-container`}>
        {nestedChildren}
      </div>
      {appendedChildren}
    </div>
  );
};

Card.displayName = 'CardComponent';

Card.propTypes = {
  /**
   * arrayOf Card.Content
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  accent: PropTypes.string,
  dts: PropTypes.string,
};

export default {
  Container: Card,
  Content: CardContent,
};
