import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
const CardContent = ({
  children,
  className,
  stretch = false,
  fill = false,
  append = false,
  dts
}) => {
  const contentClassNames = classnames('card-component-content', {
    stretch,
    fill,
    append
  }, className);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: contentClassNames
  }, expandDts(dts)), children);
};
CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fill: PropTypes.bool,
  stretch: PropTypes.bool,
  append: PropTypes.bool,
  dts: PropTypes.string
};
const Card = ({
  children,
  className,
  accent,
  dts
}) => {
  const baseClass = 'card-component';
  const containerClassNames = classnames(baseClass, {
    [`accent accent-${accent}`]: accent
  }, className);
  const nestedChildren = React.Children.map(children, child => !_.get(child, 'props.append') ? child : null);
  const appendedChildren = React.Children.map(children, child => _.get(child, 'props.append') ? child : null);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: containerClassNames
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    className: `${baseClass}-content-container`
  }, nestedChildren), appendedChildren);
};
Card.propTypes = {
  /**
   * arrayOf Card.Content
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  accent: PropTypes.string,
  dts: PropTypes.string
};
export default {
  Container: Card,
  Content: CardContent
};