import _ from 'lodash';
import classNames from 'classnames';
import fastStatelessWrapper from 'components/adslotUi/fastStatelessWrapper';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { Alert, Empty, FlexibleSpacer, Grid, GridCell, GridRow, SvgSymbol, Totals } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerSelected.scss');

const TreePickerNodeFast = fastStatelessWrapper(TreePickerNode, ['node.id', 'selected']);

const getValueByRootType = ({ averageWithinRootType, rootTypes, selectedNodesByRootType }) =>
  _(rootTypes)
    .indexBy('id')
    .mapValues(({ id }) => {
      const selectedInRootType = _.get(selectedNodesByRootType, id);
      if (_.isEmpty(selectedInRootType)) return 0;
      return _.sum(selectedInRootType, 'value') / (averageWithinRootType ? selectedInRootType.length : 1);
    })
    .value();

const getRootTypeLabel = ({ rootTypes, rootTypeId }) => {
  const rootTypeMatchingId = _.find(rootTypes, { id: rootTypeId });
  if (rootTypeMatchingId) return rootTypeMatchingId.label;

  throw new Error(`TreePickerSelectedComponent requires a rootType for id ${rootTypeId}`);
};

const TreePickerSelectedComponent = ({
  averageWithinRootType,
  baseItem,
  emptySvgSymbol,
  helpText,
  includeNode,
  itemType,
  removeNode,
  rootTypes,
  selectedLabel,
  selectedNodesByRootType,
  totalsSuffix,
  valueFormatter,
  warnOnRequired,
}) => {
  const valueByRootType = getValueByRootType({ averageWithinRootType, rootTypes, selectedNodesByRootType });

  const unresolvedRootTypes = _(rootTypes)
    .filter(({ id, isRequired }) => isRequired && _.isEmpty(selectedNodesByRootType[id]))
    .map('label')
    .join(', ');

  const scrollableClass = classNames('treepickerselected-component-scrollable', { 'is-short': unresolvedRootTypes });

  const totalsValueFormatter = totalsSuffix ? (value) => `${valueFormatter(value)} ${totalsSuffix}` : valueFormatter;

  return (
    <div className="treepickerselected-component">
      <h1 className="treepickerselected-component-header">{selectedLabel}</h1>

      {unresolvedRootTypes ?
        <Alert type={warnOnRequired ? 'warning' : 'danger'}>Required: {unresolvedRootTypes}.</Alert> :
        null
      }

      <div className={scrollableClass}>
        {_.map(selectedNodesByRootType, (val, rootTypeId) => {
          const rootTypeLabel = getRootTypeLabel({ rootTypes, rootTypeId });

          return (
            <Grid key={rootTypeId}>
              <GridRow type="header">
                <GridCell stretch>{rootTypeLabel}</GridCell>
              </GridRow>

              {_.map(selectedNodesByRootType[rootTypeId], (node) =>
                <TreePickerNodeFast
                  includeNode={includeNode}
                  itemType={itemType}
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
                <GridCell dts={`${_.kebabCase(rootTypeLabel)}-total-or-average`}>
                  {totalsValueFormatter(valueByRootType[rootTypeId])}
                </GridCell>
              </GridRow>

            </Grid>
          );
        })}
        <Empty
          collection={_.values(selectedNodesByRootType)}
          svgSymbol={emptySvgSymbol}
          text="Nothing selected."
        />
        <FlexibleSpacer />
      </div>

      <Totals
        toSum={[
          { label: baseItem.label, value: baseItem.value },
          { label: selectedLabel, value: _.sum(valueByRootType) },
        ]}
        valueFormatter={totalsValueFormatter}
      />
    </div>
  );
};

TreePickerSelectedComponent.displayName = 'AdslotUiTreePickerSelectedComponent';

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
  itemType: PropTypes.string.isRequired,
  removeNode: PropTypes.func.isRequired,
  rootTypes: PropTypes.arrayOf(TreePickerPropTypes.rootType).isRequired,
  totalsSuffix: PropTypes.string.isRequired,
  selectedLabel: PropTypes.string.isRequired,
  selectedNodesByRootType: PropTypes.shape().isRequired,
  valueFormatter: PropTypes.func.isRequired,
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
  warnOnRequired: false,
};

export default TreePickerSelectedComponent;
