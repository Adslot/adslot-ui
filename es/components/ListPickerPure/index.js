import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Empty from '../Empty';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';
import { useArrowFocus } from '../../hooks';

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
  const ref = React.useRef();
  useArrowFocus({
    ref,
    onFocus: el => !allowMultiSelection && handleChange(_.find(items, _ref2 => {
      let {
        id
      } = _ref2;
      return _.toString(id) === el.dataset.auiValue;
    }))(),
    selector: `.grid-component-cell-toggle .listpickerpure-component-toggle`,
    loop: true,
    orientation: 'vertical'
  });
  const [selectedItems, setSelectedItems] = React.useState(selectedItemsProp);

  const isItemSelected = item => {
    return _.some(selectedItems, {
      id: item.id
    });
  };

  const handleChange = item => {
    return () => {
      const isSelected = isItemSelected(item);

      if (isSelected) {
        setSelectedItems(_selectedItems => allowMultiSelection ? _.reject(_selectedItems, {
          id: item.id
        }) : [item]);
        deselectItem(item, allowMultiSelection);
      } else {
        setSelectedItems(_selectedItems => allowMultiSelection ? [..._selectedItems, item] : [item]);
        selectItem(item, allowMultiSelection);
      }
    };
  };

  const ToggleComponent = allowMultiSelection ? Checkbox : Radio;
  return /*#__PURE__*/React.createElement("div", {
    className: "listpickerpure-component",
    "data-test-selector": `listpickerpure-component-${_.kebabCase(itemType)}`
  }, itemHeaders ? /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(GridRow, {
    type: "header"
  }, /*#__PURE__*/React.createElement(GridCell, {
    stretch: true
  }, itemHeaders.label), /*#__PURE__*/React.createElement(GridCell, {
    classSuffixes: ['header-toggle']
  }, itemHeaders.toggle), addonFormatter ? /*#__PURE__*/React.createElement(GridCell, {
    classSuffixes: ['header-addon']
  }, itemHeaders.addon) : null)) : null, /*#__PURE__*/React.createElement("div", {
    className: "listpickerpure-component-items",
    ref: ref
  }, /*#__PURE__*/React.createElement(Grid, null, _.map(items, item => {
    const idString = `${_.kebabCase(itemType)}-${item.id}`;
    return /*#__PURE__*/React.createElement(GridRow, {
      key: item.id,
      dts: idString
    }, /*#__PURE__*/React.createElement(GridCell, {
      classSuffixes: ['label', isItemSelected(item) ? 'selected' : ''],
      dts: "label",
      stretch: true
    }, /*#__PURE__*/React.createElement("label", {
      id: `${idString}-label`,
      className: "listpickerpure-component-label",
      htmlFor: idString
    }, labelFormatter(item))), /*#__PURE__*/React.createElement(GridCell, {
      classSuffixes: ['toggle', isItemSelected(item) ? 'selected' : ''],
      dts: "toggle"
    }, /*#__PURE__*/React.createElement(ToggleComponent, {
      id: idString,
      checked: isItemSelected(item),
      onChange: handleChange(item),
      className: "listpickerpure-component-toggle",
      value: item.id,
      "aria-labelledby": `${idString}-label`
    })), addonFormatter ? /*#__PURE__*/React.createElement(GridCell, {
      classSuffixes: ['addon', isItemSelected(item) ? 'selected' : ''],
      dts: "addon"
    }, addonFormatter(item)) : null);
  }), /*#__PURE__*/React.createElement(Empty, {
    collection: items,
    icon: emptySvgSymbol,
    text: emptyMessage
  }))));
};

const itemProps = PropTypes.shape({
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
export default ListPickerPure;