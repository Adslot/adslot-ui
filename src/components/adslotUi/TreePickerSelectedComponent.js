import _ from 'lodash';
import classNames from 'classnames';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import React, { PropTypes } from 'react';
import { Alert, Empty, FlexSpacer, Grid, GridCell, GridRow, Totals } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerSelected.scss');

const TreePickerSelectedComponent = ({
  averageWithinRootType,
  baseItem,
  emptyIcon,
  includeNode,
  removeNode,
  rootTypes,
  selectedNodesByRootType,
  valueFormatter,
  valueLabel,
  warnOnRequired,
}) => {
  const valueByRootType = _(rootTypes)
    .indexBy('id')
    .mapValues(({ id }) => {
      const selectedInRootType = _.get(selectedNodesByRootType, id);
      if (_.isEmpty(selectedInRootType)) return 0;
      return _.sum(selectedInRootType, 'value') / (averageWithinRootType ? selectedInRootType.length : 1);
    })
    .value();

  const totalOfRootTypeValues = _.sum(valueByRootType);

  const unresolvedRootTypes = _(rootTypes)
    .filter(({ id, isRequired }) => isRequired && _.isEmpty(selectedNodesByRootType[id]))
    .map('label')
    .join(', ');

  const getRootTypeLabel = (rootTypeId) => {
    const rootTypeMatchingId = _.find(rootTypes, { id: rootTypeId });
    if (rootTypeMatchingId) return rootTypeMatchingId.label;

    throw new Error(`TreePickerSelectedComponent requires a rootType for id ${rootTypeId}`);
  };

  const scrollableClass = classNames('treepickerselected-component-scrollable', { 'is-short': unresolvedRootTypes });

  return (
    <div className="treepickerselected-component">
      <h1 className="treepickerselected-component-header">Selected</h1>
      <Grid>
        <GridRow>
          <GridCell stretch>{baseItem.label}</GridCell>
          <GridCell>{valueFormatter(baseItem.value)}</GridCell>
        </GridRow>
      </Grid>

      <div className={scrollableClass}>
        {_.map(selectedNodesByRootType, (val, rootTypeId) =>
          <Grid key={rootTypeId}>

            <GridRow type="header">
              <GridCell stretch>{getRootTypeLabel(rootTypeId)}</GridCell>
              <GridCell>{valueLabel}</GridCell>
            </GridRow>

            {selectedNodesByRootType[rootTypeId].map((node) =>
              <TreePickerNode
                includeNode={includeNode}
                key={node.id}
                node={node}
                removeNode={removeNode}
                selected
                valueFormatter={valueFormatter}
              />
            )}

            <GridRow type="subfooter">
              <GridCell stretch />
              <GridCell>{averageWithinRootType ? 'Average' : 'Subtotal'}</GridCell>
              <GridCell>{valueFormatter(valueByRootType[rootTypeId])}</GridCell>
            </GridRow>

          </Grid>
        )}
        <Empty collection={_.values(selectedNodesByRootType)} icon={emptyIcon} text="Nothing Selected" />
        <FlexSpacer />
      </div>

      {unresolvedRootTypes ?
        <Alert type={warnOnRequired ? 'warning' : 'danger'}>Required: {unresolvedRootTypes}.</Alert> :
        null
      }

      <Totals
        toSum={[
          { value: baseItem.value, isHidden: true },
          { label: 'Selected', value: totalOfRootTypeValues },
        ]}
        valueFormatter={valueFormatter}
      />
    </div>
  );
};

TreePickerSelectedComponent.displayName = 'AdslotUiTreePickerSelectedComponent';

const rootType = PropTypes.shape({
  emptyIcon: PropTypes.string,
  icon: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
});

TreePickerSelectedComponent.propTypes = {
  averageWithinRootType: PropTypes.bool.isRequired,
  baseItem: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  emptyIcon: PropTypes.string,
  includeNode: PropTypes.func.isRequired,
  removeNode: PropTypes.func.isRequired,
  rootTypes: PropTypes.arrayOf(rootType).isRequired,
  selectedNodesByRootType: PropTypes.shape().isRequired,
  valueFormatter: PropTypes.func.isRequired,
  valueLabel: PropTypes.string.isRequired,
  warnOnRequired: PropTypes.bool.isRequired,
};

TreePickerSelectedComponent.defaultProps = {
  averageWithinRootType: false,
  baseItem: {
    label: 'Base',
    value: 0,
  },
  includeNode: () => null,
  removeNode: () => null,
  rootTypes: [],
  selectedNodesByRootType: {},
  valueFormatter: (value) => value,
  valueLabel: 'Cost',
  warnOnRequired: false,
};

export default TreePickerSelectedComponent;
