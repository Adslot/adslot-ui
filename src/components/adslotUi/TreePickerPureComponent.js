import TreePickerNav from 'components/adslotUi/TreePickerNavComponent';
import TreePickerNode from 'components/adslotUi/TreePickerNodeComponent';
import TreePickerPane from 'components/adslotUi/TreePickerPaneComponent';
import TreePickerSelected from 'components/adslotUi/TreePickerSelectedComponent';
import React, { PropTypes } from 'react';
import { Grid } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerPure.scss');

// TODO: add tab switching.

const TreePickerPureComponent = ({
  activeRootTypeId,
  baseItem,
  breadcrumbNodes,
  breadcrumbOnClick,
  emptyIcon,
  includeNode,
  removeNode,
  rootTypes,
  searchOnQuery,
  selectedNodesByRootType,
  subtree,
  valueFormatter,
  warnOnRequired,
}) => (
  <div className="treepickerpure-component">

    <TreePickerPane>

      <ul className="nav nav-tabs">
        {rootTypes.length ? rootTypes.map((rootType) =>
          <li className={(rootType.id === activeRootTypeId) ? 'active' : ''} key={rootType.id}>
            <a>
              <img className="icon" src={rootType.icon} />
              {rootType.label}
            </a>
          </li>)
        : <li><a>Loading</a></li>}
      </ul>

      <TreePickerNav
        breadcrumbNodes={breadcrumbNodes}
        breadcrumbOnClick={breadcrumbOnClick}
        searchOnQuery={searchOnQuery}
      />

      <Grid>
        {subtree.map((node) =>
          <TreePickerNode
            valueFormatter={valueFormatter}
            includeNode={includeNode}
            key={node.id}
            node={node}
            removeNode={removeNode}
            selectedNodes={selectedNodesByRootType[activeRootTypeId]}
          />
        )}
      </Grid>

    </TreePickerPane>

    <TreePickerPane>

      <TreePickerSelected
        baseItem={baseItem}
        valueFormatter={valueFormatter}
        includeNode={includeNode}
        emptyIcon={emptyIcon}
        removeNode={removeNode}
        rootTypes={rootTypes}
        selectedNodesByRootType={selectedNodesByRootType}
        warnOnRequired={warnOnRequired}
      />

    </TreePickerPane>

  </div>
);

TreePickerPureComponent.displayName = 'AdslotUiTreePickerPureComponent';

const baseItemPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

const breadCrumbNode = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

const nodePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  path: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
});

const rootType = PropTypes.shape({
  emptyIcon: PropTypes.string,
  icon: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isRequired: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
});

TreePickerPureComponent.propTypes = {
  activeRootTypeId: PropTypes.number,
  baseItem: baseItemPropType,
  breadcrumbNodes: PropTypes.arrayOf(breadCrumbNode),
  breadcrumbOnClick: PropTypes.func,
  emptyIcon: PropTypes.string,
  includeNode: PropTypes.func,
  removeNode: PropTypes.func,
  rootTypes: PropTypes.arrayOf(rootType).isRequired,
  searchOnQuery: PropTypes.func,
  selectedNodesByRootType: PropTypes.shape(),
  subtree: PropTypes.arrayOf(nodePropType).isRequired,
  valueFormatter: PropTypes.func,
  warnOnRequired: PropTypes.bool,
};

TreePickerPureComponent.defaultProps = {
  rootTypes: [],
  selectedNodesByRootType: {},
  subtree: [],
};

export default TreePickerPureComponent;
