import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import Panel from '../Panel';

var Accordion = function Accordion(_ref) {
  var dts = _ref.dts,
      children = _ref.children,
      maxExpand = _ref.maxExpand,
      defaultActivePanelIds = _ref.defaultActivePanelIds,
      onPanelClick = _ref.onPanelClick;

  var _React$useState = React.useState(function () {
    return maxExpand === 'max' ? defaultActivePanelIds : _.slice(defaultActivePanelIds, 0, maxExpand);
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activePanelIds = _React$useState2[0],
      setActivePanelIds = _React$useState2[1];

  var onChildPanelClick = function onChildPanelClick(panelId) {
    if (_.includes(activePanelIds, panelId)) {
      // remove panelId out of the active list
      setActivePanelIds(function (prevState) {
        return _.without(prevState, panelId);
      });
    } else {
      // drop panels from the beginning if max opened panels count is reached
      setActivePanelIds(function (prevState) {
        var newActivePanelIds = [].concat(_toConsumableArray(prevState), [panelId]);

        if (maxExpand !== 'max' && newActivePanelIds.length > maxExpand) {
          newActivePanelIds = _.drop(newActivePanelIds, newActivePanelIds.length - maxExpand);
        }

        return newActivePanelIds;
      });
    }

    onPanelClick === null || onPanelClick === void 0 ? void 0 : onPanelClick(panelId);
  };

  var renderPanelFromChildren = function renderPanelFromChildren(child) {
    var _child$props = child.props,
        id = _child$props.id,
        isCollapsed = _child$props.isCollapsed; // prevent rendering if child is not an instance of Accordion.Panel

    if (child.type !== Panel) {
      return null;
    } // respects child.props.isCollapsed for controlled behavior


    return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, child.props), {}, {
      onClick: onChildPanelClick,
      isCollapsed: _.isNil(isCollapsed) ? !_.includes(activePanelIds, id) : isCollapsed
    }));
  };

  if (_.isNumber(maxExpand) && maxExpand <= 0 || _.isString(maxExpand) && maxExpand !== 'max') throw new Error("maxExpand must be a positive number or 'max'");
  return /*#__PURE__*/React.createElement(Card.Container, {
    dts: dts
  }, /*#__PURE__*/React.createElement(Card.Content, {
    fill: true
  }, React.Children.map(children, renderPanelFromChildren)));
};

Accordion.propTypes = {
  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: PropTypes.string,

  /**
   * onPanelClick(panelId) takes in a single parameter which is the id of the clicked panel.
   */
  onPanelClick: PropTypes.func,

  /**
   * <span>
   *  Accept an array of <a href="/panel-example">Panel</a> or
   *  <a href="/accordion-panel-example">Accordion.Panel</a>
   *  </span>
   */
  children: PropTypes.node,
  defaultActivePanelIds: PropTypes.arrayOf(PropTypes.string),

  /**
   * Determine how many Panels can be expanded, accepted value is a positive number, or <code>max</code> to have no restriction
   */
  maxExpand: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['max'])])
};
Accordion.defaultProps = {
  maxExpand: 'max',
  defaultActivePanelIds: []
};
Accordion.Panel = Panel;
export default Accordion;