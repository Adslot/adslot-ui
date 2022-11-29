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
import './styles.css';

const ListPickerPure = ({
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
  selectedItems: selectedItemsProp,
}) => {
  const ref = React.useRef();

  useArrowFocus({
    ref,
    onFocus: (el) =>
      !allowMultiSelection && handleChange(_.find(items, ({ id }) => _.toString(id) === el.dataset.auiValue))(),
    selector: `.grid-component-cell-toggle .listpickerpure-component-toggle`,
    loop: true,
    orientation: 'vertical',
  });

  const [selectedItems, setSelectedItems] = React.useState(selectedItemsProp);

  const isItemSelected = (item) => {
    return _.some(selectedItems, { id: item.id });
  };

  const handleChange = (item) => {
    return () => {
      const isSelected = isItemSelected(item);
      if (isSelected) {
        setSelectedItems((_selectedItems) =>
          allowMultiSelection ? _.reject(_selectedItems, { id: item.id }) : [item]
        );
        deselectItem(item, allowMultiSelection);
      } else {
        setSelectedItems((_selectedItems) => (allowMultiSelection ? [..._selectedItems, item] : [item]));
        selectItem(item, allowMultiSelection);
      }
    };
  };

  const ToggleComponent = allowMultiSelection ? Checkbox : Radio;

  return (
    <div
      data-testid="listpickerpure-wrapper"
      className="listpickerpure-component"
      data-test-selector={`listpickerpure-component-${_.kebabCase(itemType)}`}
    >
      {itemHeaders ? (
        <Grid>
          <GridRow type="header">
            <GridCell stretch>{itemHeaders.label}</GridCell>
            <GridCell classSuffixes={['header-toggle']}>{itemHeaders.toggle}</GridCell>
            {addonFormatter ? <GridCell classSuffixes={['header-addon']}>{itemHeaders.addon}</GridCell> : null}
          </GridRow>
        </Grid>
      ) : null}
      <div className="listpickerpure-component-items" ref={ref}>
        <Grid>
          {_.map(items, (item) => {
            const idString = `${_.kebabCase(itemType)}-${item.id}`;
            return (
              <GridRow key={item.id} dts={idString}>
                <GridCell classSuffixes={['label', isItemSelected(item) ? 'selected' : '']} dts="label" stretch>
                  <label id={`${idString}-label`} className="listpickerpure-component-label" htmlFor={idString}>
                    {labelFormatter(item)}
                  </label>
                </GridCell>
                <GridCell classSuffixes={['toggle', isItemSelected(item) ? 'selected' : '']} dts="toggle">
                  <ToggleComponent
                    id={idString}
                    checked={isItemSelected(item)}
                    onChange={handleChange(item)}
                    className="listpickerpure-component-toggle"
                    value={item.id}
                    aria-labelledby={`${idString}-label`}
                  />
                </GridCell>
                {addonFormatter ? (
                  <GridCell classSuffixes={['addon', isItemSelected(item) ? 'selected' : '']} dts="addon">
                    {addonFormatter(item)}
                  </GridCell>
                ) : null}
              </GridRow>
            );
          })}
          <Empty collection={items} icon={emptySvgSymbol} text={emptyMessage} />
        </Grid>
      </div>
    </div>
  );
};

const itemProps = PropTypes.shape({
  id: PropTypes.any.isRequired, // id can be numeric or uuid string
});

ListPickerPure.propTypes = {
  allowMultiSelection: PropTypes.bool,
  deselectItem: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  labelFormatter: PropTypes.func,
  addonFormatter: PropTypes.func,
  itemHeaders: PropTypes.shape({
    label: PropTypes.node,
    toggle: PropTypes.string,
    addon: PropTypes.string,
  }),
  items: PropTypes.arrayOf(itemProps),
  itemType: PropTypes.string,
  selectItem: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(itemProps),
};

ListPickerPure.defaultProps = {
  allowMultiSelection: true,
  emptyMessage: 'No items to select.',
  labelFormatter: (item) => item.label,
  items: [],
  itemType: 'item',
  selectedItems: [],
};

export default ListPickerPure;
