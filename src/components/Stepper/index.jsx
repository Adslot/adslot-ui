import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
import './styles.css';

const StepperStep = ({
  id,
  label = '',
  children,
  disabled = false,
  stepIndex,
  onClick,

  isActive,
  isCompleted,
  className,
}) => {
  const classNames = classnames(
    'aui--step',
    {
      active: isActive,
      completed: isCompleted,
      disabled: disabled,
    },
    className
  );

  return (
    <div className={classNames} onClick={() => (disabled ? _.noop : onClick(id))}>
      <div className="aui--step-item">{children ? children : stepIndex + 1}</div>
      {!!label && <p className="aui--step-label">{label}</p>}
    </div>
  );
};

StepperStep.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isActive: PropTypes.bool,
  isCompleted: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  stepIndex: PropTypes.number,
};

StepperStep.defaultProps = {
  disabled: false,
};

const Stepper = ({ children, dts, size = 'medium' }) => {
  return (
    <div className={`aui--stepper aui-${size}`} data-testid="stepper-component" {...expandDts(dts)}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          key: index,
          stepIndex: index,
          ...child.props,
        });
      })}
    </div>
  );
};
export const sizes = ['small', 'medium', 'large'];

Stepper.propTypes = {
  children: PropTypes.node.isRequired,
  dts: PropTypes.string,
  /**
   * Controls the width for the stepper.
   */
  size: PropTypes.oneOf(sizes),
};

Stepper.Step = StepperStep;

export default Stepper;
