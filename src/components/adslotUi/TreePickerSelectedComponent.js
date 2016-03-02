import _ from 'lodash';
import classNames from 'classnames';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import React, { PropTypes } from 'react';
import { Alert, Empty, FlexSpacer, Grid, GridCell, GridRow, SvgSymbol, Totals } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerSelected.scss');

const TreePickerSelectedComponent = ({
  averageWithinRootType,
  baseItem,
  emptySvgSymbol,
  helpText,
  includeNode,
  removeNode,
  rootTypes,
  selectedLabel,
  selectedNodesByRootType,
  totalsSuffix,
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

  const totalsValueFormatter = totalsSuffix ? (value) => `${valueFormatter(value)} ${totalsSuffix}` : valueFormatter;

  return (
    <div className="treepickerselected-component">
      <h1 className="treepickerselected-component-header">{selectedLabel}</h1>
      <div className={scrollableClass}>
        {_.map(selectedNodesByRootType, (val, rootTypeId) =>
          <Grid key={rootTypeId}>

            <GridRow type="header">
              <GridCell stretch>{getRootTypeLabel(rootTypeId)}</GridCell>
              <GridCell>{valueLabel}</GridCell>
            </GridRow>

            {_.map(selectedNodesByRootType[rootTypeId], (node) =>
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
              <GridCell>
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Popover id={`subtotal-${rootTypeId}`}>
                      {averageWithinRootType ? helpText.average : helpText.sum}
                    </Popover>
                  }
                >
                  <span>{averageWithinRootType ? 'Average' : 'Subtotal'}</span>
                </OverlayTrigger>
              </GridCell>
              <GridCell>{totalsValueFormatter(valueByRootType[rootTypeId])}</GridCell>
            </GridRow>

          </Grid>
        )}
        <Empty
          collection={_.values(selectedNodesByRootType)}
          svgSymbol={emptySvgSymbol}
          text="Nothing Selected"
        />
        <FlexSpacer />
      </div>

      {unresolvedRootTypes ?
        <Alert type={warnOnRequired ? 'warning' : 'danger'}>Required: {unresolvedRootTypes}.</Alert> :
        null
      }

      <Totals
        toSum={[
          { label: baseItem.label, value: baseItem.value },
          { label: selectedLabel, value: totalOfRootTypeValues },
        ]}
        valueFormatter={totalsValueFormatter}
      />
    </div>
  );
};

TreePickerSelectedComponent.displayName = 'AdslotUiTreePickerSelectedComponent';

const rootType = PropTypes.shape({
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
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
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  helpText: PropTypes.shape({
    average: PropTypes.string.isRequired,
    sum: PropTypes.string.isRequired,
  }).isRequired,
  includeNode: PropTypes.func.isRequired,
  removeNode: PropTypes.func.isRequired,
  rootTypes: PropTypes.arrayOf(rootType).isRequired,
  totalsSuffix: PropTypes.string.isRequired,
  selectedLabel: PropTypes.string.isRequired,
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
  helpText: {
    average: 'Selecting adjusts the set distribution, but not the set size.',
    sum: 'Selecting adjusts the set distribution and size.',
  },
  includeNode: () => null,
  removeNode: () => null,
  rootTypes: [],
  selectedLabel: 'Selected',
  selectedNodesByRootType: {},
  totalsSuffix: '',
  valueFormatter: (value) => value,
  valueLabel: 'Cost',
  warnOnRequired: false,
};

export default TreePickerSelectedComponent;
