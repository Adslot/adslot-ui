"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Pagination = _interopRequireDefault(require("../Pagination"));
var _Empty = _interopRequireDefault(require("../Empty"));
var _Grid = _interopRequireDefault(require("../Grid"));
var _Row = _interopRequireDefault(require("../Grid/Row"));
var _Cell = _interopRequireDefault(require("../Grid/Cell"));
class PagedGrid extends _react.default.PureComponent {
  state = {
    activePage: 1
  };
  static getDerivedStateFromProps(props, state) {
    const totalPages = Math.ceil(props.items.length / props.perPage);
    return state.activePage > totalPages ? {
      activePage: totalPages
    } : null;
  }
  render() {
    const {
      activePage
    } = this.state;
    const {
      columns,
      emptyMessage,
      emptySvgSymbol,
      items,
      perPage,
      verticalCellBorder
    } = this.props;
    const pageItems = (0, _lodash.default)(items).clone().splice((this.state.activePage - 1) * perPage, perPage);
    const totalPages = Math.ceil(items.length / perPage);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "pagedgrid-component"
    }, /*#__PURE__*/_react.default.createElement(_Grid.default, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
      type: "header",
      verticalCellBorder: verticalCellBorder
    }, _lodash.default.map(columns, column => /*#__PURE__*/_react.default.createElement(_Cell.default, {
      key: column.key,
      classSuffixes: [_lodash.default.kebabCase(column.key)],
      stretch: column.stretch
    }, column.label))), _lodash.default.map(pageItems, item => /*#__PURE__*/_react.default.createElement(_Row.default, {
      key: item.id,
      verticalCellBorder: verticalCellBorder
    }, _lodash.default.map(columns, column => /*#__PURE__*/_react.default.createElement(_Cell.default, {
      key: `${item.id}-${column.key}`,
      classSuffixes: [_lodash.default.kebabCase(column.key)],
      stretch: column.stretch
    }, _lodash.default.get(item, column.key))))), /*#__PURE__*/_react.default.createElement(_Empty.default, {
      collection: items,
      icon: emptySvgSymbol,
      text: emptyMessage
    })), totalPages > 1 ? /*#__PURE__*/_react.default.createElement("div", {
      className: "pagedgrid-component-pagination"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "pagedgrid-component-pagination-info"
    }, (activePage - 1) * perPage + 1, "\u2013", Math.min(activePage * perPage, items.length), " of ", items.length), /*#__PURE__*/_react.default.createElement(_Pagination.default, {
      activePage: activePage,
      pageCount: totalPages,
      next: true,
      onSelect: selectedPage => this.setState({
        activePage: selectedPage
      }),
      prev: true
    })) : null);
  }
}
const itemProps = _propTypes.default.shape({
  id: _propTypes.default.any.isRequired
});
const columnProps = _propTypes.default.shape({
  key: _propTypes.default.string.isRequired,
  label: _propTypes.default.any,
  stretch: _propTypes.default.bool
});
PagedGrid.propTypes = {
  columns: _propTypes.default.arrayOf(columnProps).isRequired,
  emptyMessage: _propTypes.default.string,
  emptySvgSymbol: _propTypes.default.node,
  items: _propTypes.default.arrayOf(itemProps).isRequired,
  perPage: _propTypes.default.number.isRequired,
  verticalCellBorder: _propTypes.default.bool
};
var _default = PagedGrid;
exports.default = _default;