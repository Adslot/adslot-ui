import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const defaultComponentClass = 'tag-component';

export const ActionButton = ({ onAction, id, actionIcon }) => (
  <span className="action-button" onClick={() => onAction(id)}>
    {actionIcon || <span className="action-icon">&#x2715;</span>}
  </span>
);

ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  actionIcon: PropTypes.node,
};

const Tag = ({ children, inverse, id, onAction, accent, baseClass, actionIcon, dts: customDts }) => {
  const classes = classnames([
    defaultComponentClass,
    {
      [`${baseClass}-inverse`]: inverse,
      [`${baseClass}-accent accent-${accent}`]: accent,
      [`${defaultComponentClass}-actionable`]: onAction,
      [`${baseClass}`]: baseClass !== defaultComponentClass,
    },
  ]);
  const dts = customDts || `tag-${id}`;

  return (
    <span className={classes} data-test-selector={dts}>
      {children}
      {onAction ? <ActionButton {...{ onAction, id, actionIcon }} /> : null}
    </span>
  );
};

Tag.displayName = 'TagComponent';

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  accent: PropTypes.string,
  baseClass: PropTypes.string,
  inverse: PropTypes.bool,
  onAction: PropTypes.func,
  actionIcon: PropTypes.node,
  dts: PropTypes.string,
};

Tag.defaultProps = {
  id: 'default',
  baseClass: 'tag-component',
};

export default Tag;
