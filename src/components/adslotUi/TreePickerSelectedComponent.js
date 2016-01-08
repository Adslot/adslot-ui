import _ from 'lodash';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import React, { PropTypes } from 'react';
import { Alert, Empty, Grid, GridCell, GridRow, Totals } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerSelected.scss');

const TreePickerSelectedComponent = ({
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
  const averagesByRootType = _(rootTypes)
    .indexBy('id')
    .mapValues(({ id }) => {
      const selectedInRootType = _.get(selectedNodesByRootType, id);
      if (_.isEmpty(selectedInRootType)) return 0;

      return _.sum(selectedInRootType, 'value') / selectedInRootType.length;
    })
    .value();

  const totalOfAverages = _.sum(averagesByRootType);

  const unresolvedRootTypes = _(rootTypes)
    .filter(({ id, isRequired }) => isRequired && _.isEmpty(selectedNodesByRootType[id]))
    .pluck('label')
    .join(', ');

  const getRootTypeLabel = (rootTypeId) => {
    const rootTypeMatchingId = _.find(rootTypes, { id: +rootTypeId });
    if (rootTypeMatchingId) return rootTypeMatchingId.label;

    throw new Error(`TreePickerSelectedComponent requires a rootType for id ${rootTypeId}`);
  };

  return (
    <div className="treepickerselected-component">
      <h1 className="treepickerselected-component-header">Selected</h1>
      <Totals
        toSum={[
          { label: baseItem.label, value: baseItem.value },
          { label: 'Selected', value: totalOfAverages },
        ]}
        valueFormatter={valueFormatter}
      />

      {_.keys(selectedNodesByRootType).map((rootTypeId) =>
        <Grid key={rootTypeId}>

          <GridRow type="header">
            <GridCell stretch>{getRootTypeLabel(rootTypeId)}</GridCell>
            <GridCell>{valueLabel}</GridCell>
          </GridRow>

          {selectedNodesByRootType[rootTypeId].map((node) =>
            <TreePickerNode
              buttonFirst
              valueFormatter={valueFormatter}
              includeNode={includeNode}
              key={node.id}
              node={node}
              removeNode={removeNode}
              selectedNodes={selectedNodesByRootType[rootTypeId]}
            />
          )}

          <GridRow type="subfooter">
            <GridCell stretch />
            <GridCell>Average</GridCell>
            <GridCell>{valueFormatter(averagesByRootType[rootTypeId])}</GridCell>
          </GridRow>

        </Grid>
      )}
      <Empty collection={_.values(selectedNodesByRootType)} icon={emptyIcon} text="Nothing Selected" />

      {(unresolvedRootTypes) ?
        <Alert type={warnOnRequired ? 'warning' : 'danger'}>{unresolvedRootTypes} are required.</Alert> :
        null
      }
    </div>
  );
};

TreePickerSelectedComponent.displayName = 'AdslotUiTreePickerSelectedComponent';

const rootType = PropTypes.shape({
  emptyIcon: PropTypes.string,
  icon: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isRequired: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
});

TreePickerSelectedComponent.propTypes = {
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
