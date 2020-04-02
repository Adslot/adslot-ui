import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Empty from '../Empty';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';
import './styles.scss';

class ListPickerPureComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: this.props.selectedItems,
    };
    this.isItemSelected = this.isItemSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateSelectedItems = this.updateSelectedItems.bind(this);
  }

  isItemSelected(item) {
    return _.some(this.state.selectedItems, { id: item.id });
  }

  handleChange(item) {
    const { deselectItem, selectItem, allowMultiSelection } = this.props;

    return () => {
      const isSelected = this.isItemSelected(item);
      this.updateSelectedItems(item, allowMultiSelection, isSelected);
      if (isSelected) {
        deselectItem(item, allowMultiSelection);
      } else {
        selectItem(item, allowMultiSelection);
      }
    };
  }

  updateSelectedItems(item, allowMultiSelection, isSelected) {
    const newSelectedItemsArray = _.clone(this.state.selectedItems);

    if (allowMultiSelection) {
      if (isSelected) {
        _.remove(newSelectedItemsArray, { id: item.id });
      } else {
        newSelectedItemsArray.push(item);
      }

      this.setState({ selectedItems: newSelectedItemsArray });
    } else {
      this.setState({
        selectedItems: [item],
      });
    }
  }

  render() {
    const {
      allowMultiSelection,
      emptyIcon,
      emptyMessage,
      emptySvgSymbol,
      items,
      labelFormatter,
      addonFormatter,
      itemHeaders,
      itemType,
    } = this.props;
    const ToggleComponent = allowMultiSelection ? Checkbox : Radio;

    return (
      <div
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
        <div className="listpickerpure-component-items">
          <Grid>
            {_.map(items, item => (
              <GridRow key={item.id} dts={`${_.kebabCase(itemType)}-${item.id}`}>
                <GridCell stretch dts="label">
                  {labelFormatter(item)}
                </GridCell>
                <GridCell classSuffixes={['toggle']} dts="toggle">
                  <ToggleComponent checked={this.isItemSelected(item)} onChange={this.handleChange(item)} />
                </GridCell>
                {addonFormatter ? (
                  <GridCell classSuffixes={['addon']} dts="addon">
                    {addonFormatter(item)}
                  </GridCell>
                ) : null}
              </GridRow>
            ))}
            <Empty collection={items} icon={emptyIcon} svgSymbol={emptySvgSymbol} text={emptyMessage} />
          </Grid>
        </div>
      </div>
    );
  }
}

ListPickerPureComponent.displayName = 'ListPickerPureComponent';

const itemProps = PropTypes.shape({
  id: PropTypes.any.isRequired, // id can be numeric or uuid string
});

ListPickerPureComponent.propTypes = {
  allowMultiSelection: PropTypes.bool,
  deselectItem: PropTypes.func,
  emptyIcon: PropTypes.string,
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
  selectItem: PropTypes.func,
  selectedItems: PropTypes.arrayOf(itemProps),
};

ListPickerPureComponent.defaultProps = {
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
  selectedItems: [],
};

export default ListPickerPureComponent;
