import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useArrowFocus } from '../../hooks';
import { expandDts, invariant } from '../../utils';
import '../RadioGroup/style.css';

const itemClass = 'aui--radio';

const RadioGroupContext = React.createContext({});

const RadioGroupProvider = ({ children, value, onChange, variant, name }) => {
  const context = React.useMemo(
    () => ({
      value,
      onChange,
      variant,
      name,
    }),
    [value, onChange, variant, name]
  );
  return <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>;
};

export const useRadioGroup = () => React.useContext(RadioGroupContext);

const RadioGroup = ({
  name,
  value,
  onChange,
  orientation = 'vertical',
  className,
  dts,
  children,
  variant = 'default',
  inline,
  // This prop is intentionally not exposed to consumers,
  // it is used to allow the DropdownMenu RadioGroup
  // to control its own arrow focus
  // eslint-disable-next-line react/prop-types
  disableArrowKeys,
  ...rest
}) => {
  invariant(!inline, 'RadioGroup: the inline prop has been replaced by orientation="vertical"');

  const ref = React.useRef();

  useArrowFocus({
    ref,
    disabled: disableArrowKeys,
    onFocus: (el) => onChange(el.dataset.auiValue),
    selector: `.${itemClass}[role=radio]`,
    loop: true,
    orientation,
  });

  return (
    <RadioGroupProvider value={value} onChange={onChange} variant={variant} name={name}>
      <div
        {...rest}
        data-testid="radio-group-wrapper"
        role={'radiogroup'}
        aria-orientation={orientation}
        className={classnames('aui--radio-group', className, {
          'is-vertical': orientation === 'vertical',
          'is-default': variant === 'default',
        })}
        {...expandDts(dts)}
        ref={ref}
      >
        {children}
      </div>
    </RadioGroupProvider>
  );
};

export const radioGroupPropTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'box']),
  id: PropTypes.string,
  /**
   *  @deprecated use orientation="horizontal" instead
   **/
  inline: PropTypes.bool,
};

RadioGroup.propTypes = {
  ...radioGroupPropTypes,
};

export default RadioGroup;
