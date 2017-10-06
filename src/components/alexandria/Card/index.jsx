import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from 'lib/utils';
import './styles.scss';

const CardContent = ({ children, className, stretch, fill, append, dts }) => {
  const baseClass = 'card-component-content';
  const contentClassNames = [baseClass];

  if (stretch) contentClassNames.push('stretch');
  if (fill) contentClassNames.push('fill');
  if (append) contentClassNames.push('append');
  if (className) contentClassNames.push(className);

  return (
    <div className={contentClassNames.join(' ')} {...expandDts(dts)}>
      {children}
    </div>
  );
};

CardContent.displayName = 'AlexandriaCardContentComponent';

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
  const containerClassNames = [baseClass];
  if (accent) containerClassNames.push(`accent accent-${accent}`);
  if (className) containerClassNames.push(className);

  const nestedChildren = React.Children.map(children, (child) => (// eslint-disable-line lodash/prefer-lodash-method
    !_.get(child, 'props.append') ? child : null
  ));
  const appendedChildren = React.Children.map(children, (child) => (// eslint-disable-line lodash/prefer-lodash-method
    _.get(child, 'props.append') ? child : null
  ));

  return (
    <div className={containerClassNames.join(' ')} {...expandDts(dts)}>
      <div className={`${baseClass}-content-container`}>{nestedChildren}</div>
      {appendedChildren}
    </div>
  );
};

Card.displayName = 'AlexandriaCardComponent';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  accent: PropTypes.string,
  dts: PropTypes.string,
};

export default {
  Container: Card,
  Content: CardContent,
};
