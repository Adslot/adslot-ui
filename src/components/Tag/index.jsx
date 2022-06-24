import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const defaultComponentClass = 'tag-component';

export const ActionButton = ({ onAction, id, actionIcon }) => (
  <span data-testid="tag-action-button" className="action-button" onClick={() => onAction(id)}>
    {actionIcon || (
      <span data-testid="tag-action-icon" className="action-icon">
        &#x2715;
      </span>
    )}
  </span>
);

ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  actionIcon: PropTypes.node,
};

const Tag = ({ children, inverse, id, onAction, accent, className, actionIcon, dts: customDts }) => {
  const classes = classnames([
    defaultComponentClass,
    {
      [`${defaultComponentClass}-inverse`]: inverse,
      [`${defaultComponentClass}-accent accent-${accent}`]: accent,
      [`${defaultComponentClass}-actionable`]: onAction,
    },
    className,
  ]);
  const dts = customDts || `tag-${id}`;

  return (
    <span data-testid="tag-wrapper" className={classes} data-test-selector={dts}>
      {children}
      {onAction ? <ActionButton {...{ onAction, id, actionIcon }} /> : null}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  accent: PropTypes.string,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  onAction: PropTypes.func,
  actionIcon: PropTypes.node,
  dts: PropTypes.string,
};

Tag.defaultProps = {
  id: 'default',
};

export default Tag;
