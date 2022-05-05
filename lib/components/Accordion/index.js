"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("../Card"));

var _Panel = _interopRequireDefault(require("../Panel"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Accordion = function Accordion(_ref) {
  var dts = _ref.dts,
      children = _ref.children,
      maxExpand = _ref.maxExpand,
      defaultActivePanelIds = _ref.defaultActivePanelIds,
      onPanelClick = _ref.onPanelClick;

  var _React$useState = _react.default.useState(function () {
    return maxExpand === 'max' ? defaultActivePanelIds : _lodash.default.slice(defaultActivePanelIds, 0, maxExpand);
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      activePanelIds = _React$useState2[0],
      setActivePanelIds = _React$useState2[1];

  var onChildPanelClick = function onChildPanelClick(panelId) {
    if (_lodash.default.includes(activePanelIds, panelId)) {
      // remove panelId out of the active list
      setActivePanelIds(function (prevState) {
        return _lodash.default.without(prevState, panelId);
      });
    } else {
      // drop panels from the beginning if max opened panels count is reached
      setActivePanelIds(function (prevState) {
        var newActivePanelIds = [].concat((0, _toConsumableArray2.default)(prevState), [panelId]);

        if (maxExpand !== 'max' && newActivePanelIds.length > maxExpand) {
          newActivePanelIds = _lodash.default.drop(newActivePanelIds, newActivePanelIds.length - maxExpand);
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

    if (child.type !== _Panel.default) {
      return null;
    } // respects child.props.isCollapsed for controlled behavior


    return /*#__PURE__*/_react.default.cloneElement(child, _objectSpread(_objectSpread({}, child.props), {}, {
      onClick: onChildPanelClick,
      isCollapsed: _lodash.default.isNil(isCollapsed) ? !_lodash.default.includes(activePanelIds, id) : isCollapsed
    }));
  };

  if (_lodash.default.isNumber(maxExpand) && maxExpand <= 0 || _lodash.default.isString(maxExpand) && maxExpand !== 'max') throw new Error("maxExpand must be a positive number or 'max'");
  return /*#__PURE__*/_react.default.createElement(_Card.default.Container, {
    dts: dts
  }, /*#__PURE__*/_react.default.createElement(_Card.default.Content, {
    fill: true
  }, _react.default.Children.map(children, renderPanelFromChildren)));
};

Accordion.propTypes = {
  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: _propTypes.default.string,

  /**
   * onPanelClick(panelId) takes in a single parameter which is the id of the clicked panel.
   */
  onPanelClick: _propTypes.default.func,

  /**
   * <span>
   *  Accept an array of <a href="/panel-example">Panel</a> or
   *  <a href="/accordion-panel-example">Accordion.Panel</a>
   *  </span>
   */
  children: _propTypes.default.node,
  defaultActivePanelIds: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * Determine how many Panels can be expanded, accepted value is a positive number, or <code>max</code> to have no restriction
   */
  maxExpand: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.oneOf(['max'])])
};
Accordion.defaultProps = {
  maxExpand: 'max',
  defaultActivePanelIds: []
};
Accordion.Panel = _Panel.default;
var _default = Accordion;
exports.default = _default;