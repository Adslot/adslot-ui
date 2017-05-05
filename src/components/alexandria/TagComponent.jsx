import React, { PropTypes } from 'react';
import SvgSymbol from 'components/alexandria/SvgSymbolComponent';
import classSuffixHelper from '../../helpers/classSuffixHelper';

require('styles/alexandria/Tag.scss');

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

const TagComponent = ({ children, inverse, id, onAction, accent, actionIconSvgHref }) => {
  const classSuffixes = [];
  if (inverse) { classSuffixes.push('inverse'); }

  if (accent) { classSuffixes.push(`accent accent-${accent}`); }

  if (onAction) { classSuffixes.push('actionable'); }

  const classes = classSuffixHelper({ classSuffixes, componentClass });

  return (
    <span className={`${componentClass}${classes}`} data-test-selector={`tag-${id}`}>
      {children}
      {onAction ? <ActionButton {...{ onAction, id, actionIconSvgHref }} /> : null}
    </span>
  );
};

TagComponent.displayName = 'AlexandriaTagComponent';

TagComponent.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  accent: PropTypes.string,
  inverse: PropTypes.bool,
  onAction: PropTypes.func,
  actionIconSvgHref: PropTypes.string,
};

TagComponent.defaultProps = {
  id: 'default',
};

export default TagComponent;
