import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      className = _ref.className,
      stretch = _ref.stretch,
      fill = _ref.fill,
      append = _ref.append,
      dts = _ref.dts;
  var contentClassNames = classnames('card-component-content', {
    stretch: stretch,
    fill: fill,
    append: append
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
CardContent.defaultProps = {
  fill: false,
  stretch: false,
  append: false
};

var Card = function Card(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      accent = _ref2.accent,
      dts = _ref2.dts;
  var baseClass = 'card-component';
  var containerClassNames = classnames(baseClass, _defineProperty({}, "accent accent-".concat(accent), accent), className);
  var nestedChildren = React.Children.map(children, function (child // eslint-disable-line lodash/prefer-lodash-method
  ) {
    return !_.get(child, 'props.append') ? child : null;
  });
  var appendedChildren = React.Children.map(children, function (child // eslint-disable-line lodash/prefer-lodash-method
  ) {
    return _.get(child, 'props.append') ? child : null;
  });
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: containerClassNames
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClass, "-content-container")
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