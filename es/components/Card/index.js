import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
const CardContent = _ref => {
  let {
    children,
    className,
    stretch,
    fill,
    append,
    dts
  } = _ref;
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
CardContent.defaultProps = {
  fill: false,
  stretch: false,
  append: false
};
const Card = _ref2 => {
  let {
    children,
    className,
    accent,
    dts
  } = _ref2;
  const baseClass = 'card-component';
  const containerClassNames = classnames(baseClass, {
    [`accent accent-${accent}`]: accent
  }, className);
  const nestedChildren = React.Children.map(children, (child // eslint-disable-line lodash/prefer-lodash-method
  ) => !_.get(child, 'props.append') ? child : null);
  const appendedChildren = React.Children.map(children, (child // eslint-disable-line lodash/prefer-lodash-method
  ) => _.get(child, 'props.append') ? child : null);
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