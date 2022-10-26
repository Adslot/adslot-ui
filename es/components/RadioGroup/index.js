import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useArrowFocus } from '../../hooks';
import { expandDts, invariant } from '../../lib/utils';
const itemClass = 'aui--radio';
const RadioGroupContext = /*#__PURE__*/React.createContext({});

const RadioGroupProvider = _ref => {
  let {
    children,
    value,
    onChange,
    variant,
    name
  } = _ref;
  const context = React.useMemo(() => ({
    value,
    onChange,
    variant,
    name
  }), [value, onChange, variant, name]);
  return /*#__PURE__*/React.createElement(RadioGroupContext.Provider, {
    value: context
  }, children);
};

export const useRadioGroup = () => React.useContext(RadioGroupContext);

const RadioGroup = _ref2 => {
  let {
    name,
    value,
    onChange,
    orientation = 'vertical',
    className,
    dts,
    children,
    variant = 'default',
    inline,
    ...rest
  } = _ref2;
  invariant(!inline, 'RadioGroup: the inline prop has been replaced by orientation="vertical"');
  const ref = React.useRef();
  useArrowFocus({
    ref,
    onFocus: el => onChange(el.dataset.auiValue),
    selector: `.${itemClass}[role=radio]`,
    loop: true,
    orientation
  });
  return /*#__PURE__*/React.createElement(RadioGroupProvider, {
    value: value,
    onChange: onChange,
    variant: variant,
    name: name
  }, /*#__PURE__*/React.createElement("div", Object.assign({}, rest, {
    role: 'radiogroup',
    "aria-orientation": orientation,
    className: classnames('aui--radio-group', className, {
      'is-vertical': orientation === 'vertical',
      'is-default': variant === 'default'
    })
  }, expandDts(dts), {
    ref: ref
  }), children));
};

RadioGroup.propTypes = {
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
  inline: PropTypes.bool
};
export default RadioGroup;