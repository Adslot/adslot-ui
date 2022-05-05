"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Pagination = _interopRequireDefault(require("../Pagination"));

var _Empty = _interopRequireDefault(require("../Empty"));

var _Grid = _interopRequireDefault(require("../Grid"));

var _Row = _interopRequireDefault(require("../Grid/Row"));

var _Cell = _interopRequireDefault(require("../Grid/Cell"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PagedGrid = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(PagedGrid, _React$PureComponent);

  var _super = _createSuper(PagedGrid);

  function PagedGrid() {
    var _this;

    (0, _classCallCheck2.default)(this, PagedGrid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      activePage: 1
    });
    return _this;
  }

  (0, _createClass2.default)(PagedGrid, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var activePage = this.state.activePage;
      var _this$props = this.props,
          columns = _this$props.columns,
          emptyMessage = _this$props.emptyMessage,
          emptySvgSymbol = _this$props.emptySvgSymbol,
          items = _this$props.items,
          perPage = _this$props.perPage,
          verticalCellBorder = _this$props.verticalCellBorder;
      var pageItems = (0, _lodash.default)(items).clone().splice((this.state.activePage - 1) * perPage, perPage);
      var totalPages = Math.ceil(items.length / perPage);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "pagedgrid-component"
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
        type: "header",
        verticalCellBorder: verticalCellBorder
      }, _lodash.default.map(columns, function (column) {
        return /*#__PURE__*/_react.default.createElement(_Cell.default, {
          key: column.key,
          classSuffixes: [_lodash.default.kebabCase(column.key)],
          stretch: column.stretch
        }, column.label);
      })), _lodash.default.map(pageItems, function (item) {
        return /*#__PURE__*/_react.default.createElement(_Row.default, {
          key: item.id,
          verticalCellBorder: verticalCellBorder
        }, _lodash.default.map(columns, function (column) {
          return /*#__PURE__*/_react.default.createElement(_Cell.default, {
            key: "".concat(item.id, "-").concat(column.key),
            classSuffixes: [_lodash.default.kebabCase(column.key)],
            stretch: column.stretch
          }, _lodash.default.get(item, column.key));
        }));
      }), /*#__PURE__*/_react.default.createElement(_Empty.default, {
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
        onSelect: function onSelect(selectedPage) {
          return _this2.setState({
            activePage: selectedPage
          });
        },
        prev: true
      })) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var totalPages = Math.ceil(props.items.length / props.perPage);
      return state.activePage > totalPages ? {
        activePage: totalPages
      } : null;
    }
  }]);
  return PagedGrid;
}(_react.default.PureComponent);

var itemProps = _propTypes.default.shape({
  id: _propTypes.default.any.isRequired
});

var columnProps = _propTypes.default.shape({
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