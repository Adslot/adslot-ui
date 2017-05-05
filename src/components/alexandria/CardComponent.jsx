import _ from 'lodash';
import React, { PropTypes } from 'react';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/alexandria/Card.scss');

const CardContentComponent = ({ children, className, stretch, fill, append, dts }) => {
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

CardContentComponent.displayName = 'AlexandriaCardContentComponent';

CardContentComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fill: PropTypes.bool.isRequired,
  stretch: PropTypes.bool.isRequired,
  append: PropTypes.bool,
  dts: PropTypes.string,
};

CardContentComponent.defaultProps = {
  fill: false,
  stretch: false,
  append: false,
};

const CardComponent = ({ children, className, accent, dts }) => {
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

CardComponent.displayName = 'AlexandriaCardComponent';

CardComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  accent: PropTypes.string,
  dts: PropTypes.string,
};

export default {
  Container: CardComponent,
  Content: CardContentComponent,
};
