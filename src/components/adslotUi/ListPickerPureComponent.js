import _ from 'lodash';
import Checkbox from 'react-icheck/lib/Checkbox';
import React, { PropTypes } from 'react';
import { Grid, GridRow, GridCell } from 'alexandria-adslot';

require('styles/adslotUi/ListPickerPure.scss');

const ListPickerPureComponent = ({
  deselectItem,
  items,
  labelFormatter,
  itemHeaders,
  selectItem,
  selectedItems,
}) => {
  let headerEl;
  if (itemHeaders !== undefined) {
    headerEl = (
      <GridRow type="header">
        <GridCell classSuffixes={['header-left']}>
          {itemHeaders.left}
        </GridCell>
        <GridCell classSuffixes={['header-right']}>
          {itemHeaders.right}
        </GridCell>
      </GridRow>
    );
  }

  const isItemSelected = (item) => _.some(selectedItems, { id: item.id });

  const handleChange = (item) => (event, checked) => {
    if (checked) {return selectItem(item);}

    deselectItem(item);
  };

  return (
    <div className="listpickerpure-component">

      <Grid>
        {headerEl}
        {items.map((item) =>
          <GridRow key={item.id}>
            <GridCell>
              {labelFormatter(item)}
            </GridCell>
            <GridCell classSuffixes={['checkbox']}>
              <Checkbox
                checked={isItemSelected(item)}
                onChange={handleChange(item)}
              />
            </GridCell>
          </GridRow>
        )}
      </Grid>

    </div>
  );
};

ListPickerPureComponent.displayName = 'AdslotUiListPickerPureComponent';

const itemType = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

ListPickerPureComponent.propTypes = {
  deselectItem: PropTypes.func.isRequired,
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
  deselectItem: () => {throw new Error('AdslotUi ListPickerPure needs a deselectItem handler');},

  labelFormatter: (item) => item.label,
  items: [],
  selectItem: () => {throw new Error('AdslotUi ListPickerPure needs a selectItem handler');},

  selectedItems: [],
};

export default ListPickerPureComponent;
