"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _Radio = _interopRequireDefault(require("../Radio"));

var _Empty = _interopRequireDefault(require("../Empty"));

var _Grid = _interopRequireDefault(require("../Grid"));

var _Row = _interopRequireDefault(require("../Grid/Row"));

var _Cell = _interopRequireDefault(require("../Grid/Cell"));

var _hooks = require("../../hooks");

const ListPickerPure = _ref => {
  let {
    allowMultiSelection,
    emptyMessage,
    emptySvgSymbol,
    items,
    labelFormatter,
    addonFormatter,
    itemHeaders,
    itemType,
    deselectItem,
    selectItem,
    selectedItems: selectedItemsProp
  } = _ref;

  const ref = _react.default.useRef();

  (0, _hooks.useArrowFocus)({
    ref,
    onFocus: el => !allowMultiSelection && handleChange(_lodash.default.find(items, _ref2 => {
      let {
        id
      } = _ref2;
      return _lodash.default.toString(id) === el.dataset.auiValue;
    }))(),
    selector: `.grid-component-cell-toggle .listpickerpure-component-toggle`,
    loop: true,
    orientation: 'vertical'
  });

  const [selectedItems, setSelectedItems] = _react.default.useState(selectedItemsProp);

  const isItemSelected = item => {
    return _lodash.default.some(selectedItems, {
      id: item.id
    });
  };

  const handleChange = item => {
    return () => {
      const isSelected = isItemSelected(item);
      updateSelectedItems(item, isSelected);

      if (isSelected) {
        deselectItem(item, allowMultiSelection);
      } else {
        selectItem(item, allowMultiSelection);
      }
    };
  };

  const updateSelectedItems = (item, isSelected) => {
    const newSelectedItemsArray = _lodash.default.clone(selectedItems);

    if (allowMultiSelection) {
      if (isSelected) {
        _lodash.default.remove(newSelectedItemsArray, {
          id: item.id
        });
      } else {
        newSelectedItemsArray.push(item);
      }

      setSelectedItems(newSelectedItemsArray);
    } else {
      setSelectedItems([item]);
    }
  };

  const ToggleComponent = allowMultiSelection ? _Checkbox.default : _Radio.default;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "listpickerpure-component",
    "data-test-selector": `listpickerpure-component-${_lodash.default.kebabCase(itemType)}`
  }, itemHeaders ? /*#__PURE__*/_react.default.createElement(_Grid.default, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
    type: "header"
  }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
    stretch: true
  }, itemHeaders.label), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    classSuffixes: ['header-toggle']
  }, itemHeaders.toggle), addonFormatter ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
    classSuffixes: ['header-addon']
  }, itemHeaders.addon) : null)) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "listpickerpure-component-items",
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, null, _lodash.default.map(items, item => {
    const idString = `${_lodash.default.kebabCase(itemType)}-${item.id}`;
    return /*#__PURE__*/_react.default.createElement(_Row.default, {
      key: item.id,
      dts: idString
    }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
      classSuffixes: ['label', isItemSelected(item) ? 'selected' : ''],
      dts: "label",
      stretch: true
    }, /*#__PURE__*/_react.default.createElement("label", {
      id: `${idString}-label`,
      className: "listpickerpure-component-label",
      htmlFor: idString
    }, labelFormatter(item))), /*#__PURE__*/_react.default.createElement(_Cell.default, {
      classSuffixes: ['toggle', isItemSelected(item) ? 'selected' : ''],
      dts: "toggle"
    }, /*#__PURE__*/_react.default.createElement(ToggleComponent, {
      id: idString,
      checked: isItemSelected(item),
      onChange: handleChange(item),
      className: "listpickerpure-component-toggle",
      value: item.id,
      "aria-labelledby": `${idString}-label`
    })), addonFormatter ? /*#__PURE__*/_react.default.createElement(_Cell.default, {
      classSuffixes: ['addon', isItemSelected(item) ? 'selected' : ''],
      dts: "addon"
    }, addonFormatter(item)) : null);
  }), /*#__PURE__*/_react.default.createElement(_Empty.default, {
    collection: items,
    icon: emptySvgSymbol,
    text: emptyMessage
  }))));
};

const itemProps = _propTypes.default.shape({
  id: _propTypes.default.any.isRequired // id can be numeric or uuid string

});

ListPickerPure.propTypes = {
  allowMultiSelection: _propTypes.default.bool,
  deselectItem: _propTypes.default.func,
  emptyMessage: _propTypes.default.string,
  emptySvgSymbol: _propTypes.default.node,
  labelFormatter: _propTypes.default.func,
  addonFormatter: _propTypes.default.func,
  itemHeaders: _propTypes.default.shape({
    label: _propTypes.default.node,
    toggle: _propTypes.default.string,
    addon: _propTypes.default.string
  }),
  items: _propTypes.default.arrayOf(itemProps),
  itemType: _propTypes.default.string,
  selectItem: _propTypes.default.func,
  selectedItems: _propTypes.default.arrayOf(itemProps)
};
ListPickerPure.defaultProps = {
  allowMultiSelection: true,
  deselectItem: () => {
    throw new Error('AdslotUi ListPickerPure needs a deselectItem handler');
  },
  emptyMessage: 'No items to select.',
  labelFormatter: item => item.label,
  items: [],
  itemType: 'item',
  selectItem: () => {
    throw new Error('AdslotUi ListPickerPure needs a selectItem handler');
  },
  selectedItems: []
};
var _default = ListPickerPure;
exports.default = _default;