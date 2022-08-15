"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("../Card"));

var _Panel = _interopRequireDefault(require("../Panel"));

const Accordion = _ref => {
  let {
    dts,
    children,
    maxExpand,
    defaultActivePanelIds,
    onPanelClick
  } = _ref;

  const [activePanelIds, setActivePanelIds] = _react.default.useState(() => {
    return maxExpand === 'max' ? defaultActivePanelIds : _lodash.default.slice(defaultActivePanelIds, 0, maxExpand);
  });

  const onChildPanelClick = panelId => {
    if (_lodash.default.includes(activePanelIds, panelId)) {
      // remove panelId out of the active list
      setActivePanelIds(prevState => _lodash.default.without(prevState, panelId));
    } else {
      // drop panels from the beginning if max opened panels count is reached
      setActivePanelIds(prevState => {
        let newActivePanelIds = [...prevState, panelId];

        if (maxExpand !== 'max' && newActivePanelIds.length > maxExpand) {
          newActivePanelIds = _lodash.default.drop(newActivePanelIds, newActivePanelIds.length - maxExpand);
        }

        return newActivePanelIds;
      });
    }

    onPanelClick === null || onPanelClick === void 0 ? void 0 : onPanelClick(panelId);
  };

  const renderPanelFromChildren = child => {
    const {
      id,
      isCollapsed
    } = child.props; // prevent rendering if child is not an instance of Accordion.Panel

    if (child.type !== _Panel.default) {
      return null;
    } // respects child.props.isCollapsed for controlled behavior


    return /*#__PURE__*/_react.default.cloneElement(child, { ...child.props,
      onClick: onChildPanelClick,
      isCollapsed: _lodash.default.isNil(isCollapsed) ? !_lodash.default.includes(activePanelIds, id) : isCollapsed
    });
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