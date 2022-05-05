import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var RadioGroup = function RadioGroup(_ref) {
  var className = _ref.className,
      onChange = _ref.onChange,
      children = _ref.children,
      name = _ref.name,
      value = _ref.value,
      inline = _ref.inline,
      id = _ref.id,
      dts = _ref.dts;
  var classNames = classnames(['radio-group-component', className]);

  var onChangeDefault = function onChangeDefault(event) {
    var newValue = event.currentTarget.value;
    onChange(newValue);
  };

  var renderChildren = function renderChildren() {
    return React.Children.map(children, function (child) {
      var childProps = _.assign({}, child.props, {
        name: name,
        checked: value === child.props.value,
        onChange: function onChange() {
          var _child$props;

          (_child$props = child.props).onChange.apply(_child$props, arguments);

          onChangeDefault.apply(void 0, arguments);
        },
        inline: inline
      });

      return /*#__PURE__*/React.cloneElement(child, childProps);
    });
  };

  return /*#__PURE__*/React.createElement("div", Object.assign({
    id: id,
    className: classNames
  }, expandDts(dts)), renderChildren());
};

RadioGroup.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onChange: PropTypes.func.isRequired,
  dts: PropTypes.string,
  inline: PropTypes.bool
};
export default RadioGroup;