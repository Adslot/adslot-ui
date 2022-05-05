import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Empty from '../Empty';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';

var ListPickerPure = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ListPickerPure, _React$PureComponent);

  var _super = _createSuper(ListPickerPure);

  function ListPickerPure(props) {
    var _this;

    _classCallCheck(this, ListPickerPure);

    _this = _super.call(this, props);
    _this.state = {
      selectedItems: _this.props.selectedItems
    };
    _this.isItemSelected = _this.isItemSelected.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.updateSelectedItems = _this.updateSelectedItems.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListPickerPure, [{
    key: "isItemSelected",
    value: function isItemSelected(item) {
      return _.some(this.state.selectedItems, {
        id: item.id
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(item) {
      var _this2 = this;

      var _this$props = this.props,
          deselectItem = _this$props.deselectItem,
          selectItem = _this$props.selectItem,
          allowMultiSelection = _this$props.allowMultiSelection;
      return function () {
        var isSelected = _this2.isItemSelected(item);

        _this2.updateSelectedItems(item, allowMultiSelection, isSelected);

        if (isSelected) {
          deselectItem(item, allowMultiSelection);
        } else {
          selectItem(item, allowMultiSelection);
        }
      };
    }
  }, {
    key: "updateSelectedItems",
    value: function updateSelectedItems(item, allowMultiSelection, isSelected) {
      var newSelectedItemsArray = _.clone(this.state.selectedItems);

      if (allowMultiSelection) {
        if (isSelected) {
          _.remove(newSelectedItemsArray, {
            id: item.id
          });
        } else {
          newSelectedItemsArray.push(item);
        }

        this.setState({
          selectedItems: newSelectedItemsArray
        });
      } else {
        this.setState({
          selectedItems: [item]
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          allowMultiSelection = _this$props2.allowMultiSelection,
          emptyMessage = _this$props2.emptyMessage,
          emptySvgSymbol = _this$props2.emptySvgSymbol,
          items = _this$props2.items,
          labelFormatter = _this$props2.labelFormatter,
          addonFormatter = _this$props2.addonFormatter,
          itemHeaders = _this$props2.itemHeaders,
          itemType = _this$props2.itemType;
      var ToggleComponent = allowMultiSelection ? Checkbox : Radio;
      return /*#__PURE__*/React.createElement("div", {
        className: "listpickerpure-component",
        "data-test-selector": "listpickerpure-component-".concat(_.kebabCase(itemType))
      }, itemHeaders ? /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(GridRow, {
        type: "header"
      }, /*#__PURE__*/React.createElement(GridCell, {
        stretch: true
      }, itemHeaders.label), /*#__PURE__*/React.createElement(GridCell, {
        classSuffixes: ['header-toggle']
      }, itemHeaders.toggle), addonFormatter ? /*#__PURE__*/React.createElement(GridCell, {
        classSuffixes: ['header-addon']
      }, itemHeaders.addon) : null)) : null, /*#__PURE__*/React.createElement("div", {
        className: "listpickerpure-component-items"
      }, /*#__PURE__*/React.createElement(Grid, null, _.map(items, function (item) {
        return /*#__PURE__*/React.createElement(GridRow, {
          key: item.id,
          dts: "".concat(_.kebabCase(itemType), "-").concat(item.id)
        }, /*#__PURE__*/React.createElement(GridCell, {
          stretch: true,
          dts: "label"
        }, labelFormatter(item)), /*#__PURE__*/React.createElement(GridCell, {
          classSuffixes: ['toggle'],
          dts: "toggle"
        }, /*#__PURE__*/React.createElement(ToggleComponent, {
          checked: _this3.isItemSelected(item),
          onChange: _this3.handleChange(item)
        })), addonFormatter ? /*#__PURE__*/React.createElement(GridCell, {
          classSuffixes: ['addon'],
          dts: "addon"
        }, addonFormatter(item)) : null);
      }), /*#__PURE__*/React.createElement(Empty, {
        collection: items,
        icon: emptySvgSymbol,
        text: emptyMessage
      }))));
    }
  }]);

  return ListPickerPure;
}(React.PureComponent);

var itemProps = PropTypes.shape({
  id: PropTypes.any.isRequired // id can be numeric or uuid string

});
ListPickerPure.propTypes = {
  allowMultiSelection: PropTypes.bool,
  deselectItem: PropTypes.func,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  labelFormatter: PropTypes.func,
  addonFormatter: PropTypes.func,
  itemHeaders: PropTypes.shape({
    label: PropTypes.node,
    toggle: PropTypes.string,
    addon: PropTypes.string
  }),
  items: PropTypes.arrayOf(itemProps),
  itemType: PropTypes.string,
  selectItem: PropTypes.func,
  selectedItems: PropTypes.arrayOf(itemProps)
};
ListPickerPure.defaultProps = {
  allowMultiSelection: true,
  deselectItem: function deselectItem() {
    throw new Error('AdslotUi ListPickerPure needs a deselectItem handler');
  },
  emptyMessage: 'No items to select.',
  labelFormatter: function labelFormatter(item) {
    return item.label;
  },
  items: [],
  itemType: 'item',
  selectItem: function selectItem() {
    throw new Error('AdslotUi ListPickerPure needs a selectItem handler');
  },
  selectedItems: []
};
export default ListPickerPure;