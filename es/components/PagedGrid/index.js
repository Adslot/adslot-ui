import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Pagination from '../Pagination';
import Empty from '../Empty';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';

var PagedGrid = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PagedGrid, _React$PureComponent);

  var _super = _createSuper(PagedGrid);

  function PagedGrid() {
    var _this;

    _classCallCheck(this, PagedGrid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      activePage: 1
    });

    return _this;
  }

  _createClass(PagedGrid, [{
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

      var pageItems = _(items).clone().splice((this.state.activePage - 1) * perPage, perPage);

      var totalPages = Math.ceil(items.length / perPage);
      return /*#__PURE__*/React.createElement("div", {
        className: "pagedgrid-component"
      }, /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(GridRow, {
        type: "header",
        verticalCellBorder: verticalCellBorder
      }, _.map(columns, function (column) {
        return /*#__PURE__*/React.createElement(GridCell, {
          key: column.key,
          classSuffixes: [_.kebabCase(column.key)],
          stretch: column.stretch
        }, column.label);
      })), _.map(pageItems, function (item) {
        return /*#__PURE__*/React.createElement(GridRow, {
          key: item.id,
          verticalCellBorder: verticalCellBorder
        }, _.map(columns, function (column) {
          return /*#__PURE__*/React.createElement(GridCell, {
            key: "".concat(item.id, "-").concat(column.key),
            classSuffixes: [_.kebabCase(column.key)],
            stretch: column.stretch
          }, _.get(item, column.key));
        }));
      }), /*#__PURE__*/React.createElement(Empty, {
        collection: items,
        icon: emptySvgSymbol,
        text: emptyMessage
      })), totalPages > 1 ? /*#__PURE__*/React.createElement("div", {
        className: "pagedgrid-component-pagination"
      }, /*#__PURE__*/React.createElement("span", {
        className: "pagedgrid-component-pagination-info"
      }, (activePage - 1) * perPage + 1, "\u2013", Math.min(activePage * perPage, items.length), " of ", items.length), /*#__PURE__*/React.createElement(Pagination, {
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
}(React.PureComponent);

var itemProps = PropTypes.shape({
  id: PropTypes.any.isRequired
});
var columnProps = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.any,
  stretch: PropTypes.bool
});
PagedGrid.propTypes = {
  columns: PropTypes.arrayOf(columnProps).isRequired,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  items: PropTypes.arrayOf(itemProps).isRequired,
  perPage: PropTypes.number.isRequired,
  verticalCellBorder: PropTypes.bool
};
export default PagedGrid;