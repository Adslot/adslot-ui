"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Button = _interopRequireDefault(require("../Button"));
const Pagination = _ref => {
  let {
    className,
    activePage,
    pageCount,
    onSelect,
    prev,
    next
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--pagination', className)
  }, activePage !== 1 && prev && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    onClick: () => onSelect(activePage - 1),
    className: (0, _classnames.default)('aui--pagination-item', 'aui--pagination-sides')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "previous-icon"
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    onClick: () => onSelect(1),
    className: (0, _classnames.default)('aui--pagination-item', {
      active: activePage === 1
    })
  }, 1), activePage > 3 && pageCount !== 4 && pageCount !== 5 && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--pagination-separator"
  }, "..."), activePage === 5 && pageCount === 5 && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    className: (0, _classnames.default)('aui--pagination-item'),
    onClick: () => onSelect(activePage - 3)
  }, activePage - 3), (activePage === pageCount && pageCount > 3 || activePage === 4 && pageCount === 5) && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    onClick: () => onSelect(activePage - 2),
    className: (0, _classnames.default)('aui--pagination-item')
  }, activePage - 2), activePage > 2 && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    className: (0, _classnames.default)('aui--pagination-item'),
    onClick: () => onSelect(activePage - 1)
  }, activePage - 1), activePage !== 1 && activePage !== pageCount && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    onClick: () => onSelect(activePage),
    className: (0, _classnames.default)('aui--pagination-item', 'active')
  }, activePage), activePage < pageCount - 1 && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    className: (0, _classnames.default)('aui--pagination-item'),
    onClick: () => onSelect(activePage + 1)
  }, activePage + 1), (activePage === 1 && pageCount > 3 || activePage === 2 && pageCount === 5) && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    className: (0, _classnames.default)('aui--pagination-item'),
    onClick: () => onSelect(activePage + 2)
  }, activePage + 2), activePage === 1 && pageCount === 5 && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    className: (0, _classnames.default)('aui--pagination-item'),
    onClick: () => onSelect(activePage + 3)
  }, activePage + 3), activePage < pageCount - 2 && pageCount !== 4 && pageCount !== 5 && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--pagination-separator"
  }, "..."), pageCount !== 1 && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    onClick: () => onSelect(pageCount),
    className: (0, _classnames.default)('aui--pagination-item', {
      active: activePage === pageCount
    })
  }, pageCount), activePage !== pageCount && next && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "borderless",
    onClick: () => onSelect(activePage + 1),
    className: (0, _classnames.default)('aui--pagination-item', 'aui--pagination-sides')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "next-icon"
  })));
};
Pagination.propTypes = {
  className: _propTypes.default.string,
  /**
   * The default active page, between 1 to the page count
   */
  activePage: _propTypes.default.number,
  /**
   * The max page count
   */
  pageCount: _propTypes.default.number.isRequired,
  /**
   * A callback function for when clicking on previous, next and pagination items
   */
  onSelect: _propTypes.default.func.isRequired,
  /**
   * The Prev Button is displayed or not
   */
  prev: _propTypes.default.bool,
  /**
   * The Next buton is displayed or not
   */
  next: _propTypes.default.bool
};
Pagination.defaultProps = {
  activePage: 1,
  prev: true,
  next: true
};
var _default = Pagination;
exports.default = _default;