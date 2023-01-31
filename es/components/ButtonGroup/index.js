import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { expandDts } from '../../lib/utils';
class ButtonGroup extends React.PureComponent {
  injectProps(children) {
    return React.Children.map(children, child => {
      if ( /*#__PURE__*/React.isValidElement(child)) {
        const buttonProps = {
          ...(this.props.color ? {
            color: this.props.color
          } : {}),
          ...(!_.isNil(this.props.variant) ? {
            variant: this.props.variant
          } : {}),
          ...(!_.isNil(this.props.disabled) ? {
            disabled: this.props.disabled
          } : {}),
          ...(this.props.size ? {
            size: this.props.size
          } : {})
        };
        const childNodes = React.Children.map(child.props.children, childNode => /*#__PURE__*/React.isValidElement(childNode) ? /*#__PURE__*/React.cloneElement(childNode, {
          ...childNode.props,
          ...(childNode.type.name === Button.name ? buttonProps : {})
        }) : childNode);
        return /*#__PURE__*/React.cloneElement(child, {
          ...child.props,
          ...(child.type.name === Button.name ? buttonProps : {}),
          ...(!_.isEmpty(childNodes) ? {
            children: childNodes.length === 1 ? childNodes[0] : childNodes
          } : {})
        });
      }
      return child;
    });
  }
  render() {
    const {
      children,
      dts
    } = this.props;
    const content = this.injectProps(children);
    return /*#__PURE__*/React.createElement("div", Object.assign({}, expandDts(dts), {
      className: "aui--button-group"
    }), content);
  }
}
ButtonGroup.propTypes = {
  dts: PropTypes.string,
  children: PropTypes.node,
  /**
   * primary, success, danger
   */
  color: PropTypes.oneOf(['primary', 'success', 'danger']),
  variant: PropTypes.oneOf(['inverse', 'borderless', 'solid']),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['large'])
};
export default ButtonGroup;