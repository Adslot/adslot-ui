"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/* eslint-disable jsx-a11y/anchor-is-valid */
var defaultWidth = 204; // 204px

var defaultMaxWidth = 295; // 295px

var baseClass = 'tile-grid-component';

var TileGrid = function TileGrid(_ref) {
  var title = _ref.title,
      items = _ref.items,
      onItemClick = _ref.onItemClick,
      distributed = _ref.distributed;

  var cardList = _lodash.default.map(items, function (item) {
    var itemClassNames = (0, _classnames2.default)("".concat(baseClass, "-item"), "".concat(baseClass, "-item-").concat(item.classSuffix), (0, _defineProperty2.default)({}, "".concat(baseClass, "-item-distributed"), distributed));
    var imgWrapperClassNames = ["".concat(baseClass, "-item-img-wrapper")];

    if (item.imgLink) {
      switch (item.imgAlign || 'left') {
        case 'center':
          imgWrapperClassNames.push("".concat(baseClass, "-item-img-wrapper-center"));
          break;

        case 'right':
          imgWrapperClassNames.push("".concat(baseClass, "-item-img-wrapper-right"));
          break;

        case 'left':
        default:
          imgWrapperClassNames.push("".concat(baseClass, "-item-img-wrapper-left"));
      }
    }

    var itemStyle = distributed ? {
      maxWidth: item.maxWidth || defaultMaxWidth
    } : {
      width: item.width || defaultWidth
    };
    return /*#__PURE__*/_react.default.createElement("li", {
      key: item.id,
      className: itemClassNames,
      style: itemStyle
    }, item.imgLink ? /*#__PURE__*/_react.default.createElement("div", {
      className: imgWrapperClassNames.join(' ')
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: item.imgLink,
      alt: "item-link"
    })) : null, /*#__PURE__*/_react.default.createElement("a", {
      className: "".concat(baseClass, "-item-link"),
      onClick: function onClick() {
        return onItemClick(item.id);
      }
    }, item.title));
  });

  return /*#__PURE__*/_react.default.createElement("div", {
    className: baseClass
  }, title ? /*#__PURE__*/_react.default.createElement("strong", {
    className: "".concat(baseClass, "-title")
  }, title) : null, /*#__PURE__*/_react.default.createElement("ul", {
    className: "".concat(baseClass, "-list")
  }, cardList));
};

TileGrid.defaultProps = {
  distributed: false
};
TileGrid.propTypes = {
  title: _propTypes.default.node,

  /**
   * 	The shape of item object is defined below
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
    classSuffix: _propTypes.default.string.isRequired,
    title: _propTypes.default.node.isRequired,
    imgLink: _propTypes.default.string,
    width: _propTypes.default.number,
    maxWidth: _propTypes.default.number,
    imgAlign: _propTypes.default.oneOf(['left', 'right', 'center'])
  })).isRequired,
  onItemClick: _propTypes.default.func.isRequired,

  /**
   * 	If distributed is true, each tile in this component will have a distributed width.
   */
  distributed: _propTypes.default.bool
};
var _default = TileGrid;
exports.default = _default;