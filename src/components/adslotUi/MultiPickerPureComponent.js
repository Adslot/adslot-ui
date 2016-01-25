import _ from 'lodash';
import Checkbox from 'react-icheck/lib/Checkbox';
import React, { PropTypes } from 'react';
import { Grid, GridRow, GridCell } from 'alexandria-adslot';

require('styles/adslotUi/MultiPickerPure.scss');

const MultiPickerPureComponent = ({
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
    <div className="multipickerpure-component">

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

MultiPickerPureComponent.displayName = 'AdslotUiMultiPickerPureComponent';

const itemType = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

MultiPickerPureComponent.propTypes = {
  deselectItem: PropTypes.func,
  labelFormatter: PropTypes.func,
  itemHeaders: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  items: PropTypes.arrayOf(itemType).isRequired,
  selectItem: PropTypes.func,
  selectedItems: PropTypes.arrayOf(itemType).isRequired,
};

MultiPickerPureComponent.defaultProps = {
  deselectItem: () => {throw new Error('AdslotUi MultiPickerPure needs a deselectItem handler');},

  labelFormatter: (item) => item.label,
  items: [],
  selectItem: () => {throw new Error('AdslotUi MultiPickerPure needs a selectItem handler');},

  selectedItems: [],
};

export default MultiPickerPureComponent;
