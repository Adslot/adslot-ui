import _ from 'lodash';
import Checkbox from 'react-icheck/lib/Checkbox';
import Radio from 'react-icheck/lib/Radio';
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
  itemHeaders,
  selectItem,
  selectedItems,
}) => {
  const handleChange = (item) => (event, checked) => {
    if (checked) {
      selectItem(item);
    } else {
      deselectItem(item);
    }
  };

  const ToggleComponent = allowMultiSelection ? Checkbox : Radio;

  return (
    <div className="listpickerpure-component">
      {itemHeaders ?
        <Grid>
          <GridRow type="header">
            <GridCell classSuffixes={['header-left']}>
              {itemHeaders.left}
            </GridCell>
            <GridCell classSuffixes={['header-right']}>
              {itemHeaders.right}
            </GridCell>
          </GridRow>
        </Grid> :
        null
      }
      <div className="listpickerpure-component-items">
        <Grid>
          {_.map(items, (item) =>
            <GridRow key={item.id}>
              <GridCell>
                {labelFormatter(item)}
              </GridCell>
              <GridCell classSuffixes={['toggle']}>
                <ToggleComponent
                  checked={isItemSelected({ item, selectedItems })}
                  onChange={handleChange(item)}
                />
              </GridCell>
            </GridRow>
          )}
          <Empty collection={items} icon={emptyIcon} svgSymbol={emptySvgSymbol} text={emptyMessage} />
        </Grid>
      </div>
    </div>
  );
};

ListPickerPureComponent.displayName = 'AdslotUiListPickerPureComponent';

const itemType = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

ListPickerPureComponent.propTypes = {
  allowMultiSelection: PropTypes.bool.isRequired,
  deselectItem: PropTypes.func.isRequired,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string.isRequired,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  labelFormatter: PropTypes.func.isRequired,
  itemHeaders: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  items: PropTypes.arrayOf(itemType).isRequired,
  selectItem: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(itemType).isRequired,
};

ListPickerPureComponent.defaultProps = {
  allowMultiSelection: true,
  deselectItem: () => {throw new Error('AdslotUi ListPickerPure needs a deselectItem handler');},

  emptyMessage: 'No items to select.',
  labelFormatter: (item) => item.label,
  items: [],
  selectItem: () => {throw new Error('AdslotUi ListPickerPure needs a selectItem handler');},

  selectedItems: [],
};

export default ListPickerPureComponent;
