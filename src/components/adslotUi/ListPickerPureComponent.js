import _ from 'lodash';
import Checkbox from 'components/adslotUi/Checkbox';
import Radio from 'components/adslotUi/Radio';
import React, { PropTypes } from 'react';
import { Empty, Grid, GridRow, GridCell, SvgSymbol } from 'alexandria-adslot';

require('styles/adslotUi/ListPickerPure.scss');

const isItemSelected = ({ item, selectedItems }) => _.some(selectedItems, { id: item.id });

const ListPickerPureComponent = ({
  allowMultiSelection,
  deselectItem,
  emptyIcon,
  emptyMessage,
  emptySvgSymbol,
  items,
  labelFormatter,
  addonFormatter,
  itemHeaders,
  itemType,
  selectItem,
  selectedItems,
}) => {
  const handleChange = (item) => (event, checked) => {
    if (checked) {
      selectItem(item, allowMultiSelection);
    } else {
      deselectItem(item, allowMultiSelection);
    }
  };

  const ToggleComponent = allowMultiSelection ? Checkbox : Radio;

  return (
    <div className="listpickerpure-component" data-test-selector={`listpickerpure-component-${itemType}`}>
      {itemHeaders ?
        <Grid>
          <GridRow type="header">
            <GridCell stretch>
              {itemHeaders.label}
            </GridCell>
            <GridCell classSuffixes={['header-toggle']}>
              {itemHeaders.toggle}
            </GridCell>
            {addonFormatter ?
              <GridCell classSuffixes={['header-addon']}>
                {itemHeaders.addon}
              </GridCell>
            : null}
          </GridRow>
        </Grid> :
        null
      }
      <div className="listpickerpure-component-items">
        <Grid>
          {_.map(items, (item) =>
            <GridRow key={item.id} dts={`${itemType}-${item.id}`}>
              <GridCell stretch dts="label">
                {labelFormatter(item)}
              </GridCell>
              <GridCell classSuffixes={['toggle']} dts="toggle">
                <ToggleComponent
                  checked={isItemSelected({ item, selectedItems })}
                  onChange={handleChange(item)}
                />
              </GridCell>
              {addonFormatter ?
                <GridCell classSuffixes={['addon']} dts="addon">
                  {addonFormatter(item)}
                </GridCell>
              : null}
            </GridRow>
          )}
          <Empty collection={items} icon={emptyIcon} svgSymbol={emptySvgSymbol} text={emptyMessage} />
        </Grid>
      </div>
    </div>
  );
};

ListPickerPureComponent.displayName = 'AdslotUiListPickerPureComponent';

const itemProps = PropTypes.shape({
  id: PropTypes.any.isRequired, // id can be numeric or uuid string
});

ListPickerPureComponent.propTypes = {
  allowMultiSelection: PropTypes.bool.isRequired,
  deselectItem: PropTypes.func.isRequired,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string.isRequired,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  labelFormatter: PropTypes.func.isRequired,
  addonFormatter: PropTypes.func,
  itemHeaders: PropTypes.shape({
    label: PropTypes.string,
    toggle: PropTypes.string,
  }),
  items: PropTypes.arrayOf(itemProps).isRequired,
  itemType: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(itemProps).isRequired,
};

ListPickerPureComponent.defaultProps = {
  allowMultiSelection: true,
  deselectItem: () => { throw new Error('AdslotUi ListPickerPure needs a deselectItem handler'); },

  emptyMessage: 'No items to select.',
  labelFormatter: (item) => item.label,
  items: [],
  selectItem: () => { throw new Error('AdslotUi ListPickerPure needs a selectItem handler'); },

  selectedItems: [],
};

export default ListPickerPureComponent;
