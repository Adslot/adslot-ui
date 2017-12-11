import React from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'alexandria/SvgSymbol';
import { classSuffixHelper } from 'lib/utils';
import './styles.scss';

const componentClass = 'tag-component';

export const ActionButton = ({ onAction, id, actionIconSvgHref }) => (
  <span className="action-button" onClick={() => onAction(id)}>
    <SvgSymbol href={actionIconSvgHref} />
  </span>
);

ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  actionIconSvgHref: PropTypes.string.isRequired,
};

const Tag = ({ children, inverse, id, onAction, accent, actionIconSvgHref }) => {
  const classSuffixes = [];
  if (inverse) {
    classSuffixes.push('inverse');
  }

  if (accent) {
    classSuffixes.push(`accent accent-${accent}`);
  }

  if (onAction) {
    classSuffixes.push('actionable');
  }

  const classes = classSuffixHelper({ classSuffixes, componentClass });

  return (
    <span className={`${componentClass}${classes}`} data-test-selector={`tag-${id}`}>
      {children}
      {onAction ? <ActionButton {...{ onAction, id, actionIconSvgHref }} /> : null}
    </span>
  );
};

Tag.displayName = 'AlexandriaTagComponent';

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  accent: PropTypes.string,
  inverse: PropTypes.bool,
  onAction: PropTypes.func,
  actionIconSvgHref: PropTypes.string,
};

Tag.defaultProps = {
  id: 'default',
};

export default Tag;
