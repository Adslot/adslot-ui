import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import useIsUnmounted from '../../hooks/useIsUnmounted';
import Button from '../Button';
import { useTreePickerSlice, useTreePickerNodes, useTreePickerSearch, useInternalActions, useRenderNode, HiddenByIdCtx } from './TreePickerContext';
import TreePickerNode from './TreePickerNode';
import { expandDts } from '../../utils';
const TreePickerTreePlaceholder = ({
  count = 5
}) => {
  return Array(count).fill(0).map((_value, index) => /*#__PURE__*/React.createElement(TreePickerNode.Placeholder, {
    key: index
  }));
};
TreePickerTreePlaceholder.propTypes = {
  count: PropTypes.number
};
const getIsInRoot = state => state.paths.length === 0;
const TreePickerTreeEmptyState = ({
  title = 'No Results.'
}) => {
  const isInRoot = useTreePickerSlice(getIsInRoot);
  const search = useTreePickerSearch();
  const {
    backTo,
    searchTo
  } = useInternalActions();
  const backAction = isInRoot ? null : /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: () => {
      backTo();
    }
  }, "Go Back");
  return /*#__PURE__*/React.createElement("div", {
    className: "aui--tree-picker-empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-title"
  }, title), search ? /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: () => {
      searchTo();
    }
  }, "Reset Search") : backAction);
};
TreePickerTreeEmptyState.propTypes = {
  title: PropTypes.node
};
const defaultPlaceholder = /*#__PURE__*/React.createElement(TreePickerTreePlaceholder, null);
const defaultEmptyState = /*#__PURE__*/React.createElement(TreePickerTreeEmptyState, null);
const TreePickerTree = ({
  className,
  resolveRootNodes,
  hiddenNodeIds,
  dts,
  placeholder = defaultPlaceholder,
  emptyState = defaultEmptyState
}) => {
  const isInRoot = useTreePickerSlice(getIsInRoot);
  const nodes = useTreePickerNodes();
  const renderNode = useRenderNode();
  const {
    goTo,
    setIsResolvingRoot
  } = useInternalActions();
  const isResolvingRoot = useTreePickerSlice('isResolvingRoot');
  const isUnmounted = useIsUnmounted();
  React.useEffect(() => {
    let cancelled = false;
    const resolve = async () => {
      if (!isInRoot) return;
      setIsResolvingRoot(true);
      try {
        const rootNodes = await resolveRootNodes();

        // ignore falsy nodes
        // or if the tree itself is unmounted
        // or if the resolveRootNodes func has changed
        if (!rootNodes || isUnmounted() || cancelled) return;
        goTo(rootNodes);
      } catch (error) {
        console.error('[TreePickerTree]', error);
      } finally {
        if (!cancelled) setIsResolvingRoot(false);
      }
    };
    resolve();
    return () => {
      cancelled = true;
    };
  }, [goTo, setIsResolvingRoot, isUnmounted, resolveRootNodes, isInRoot]);
  const byId = React.useMemo(() => _.keyBy(hiddenNodeIds), [hiddenNodeIds]);
  const visibleNodes = nodes.filter(({
    id
  }) => !byId[id]);
  return /*#__PURE__*/React.createElement(HiddenByIdCtx.Provider, {
    value: byId
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: cx('aui--tree-picker-tree', className)
  }, expandDts(dts)), isResolvingRoot ? placeholder : visibleNodes.length === 0 ? emptyState : visibleNodes.map(renderNode)));
};
TreePickerTree.propTypes = {
  className: PropTypes.string,
  hiddenNodeIds: PropTypes.array,
  resolveRootNodes: PropTypes.func.isRequired,
  placeholder: PropTypes.node,
  emptyState: PropTypes.node,
  dts: PropTypes.string
};
TreePickerTree.Placeholder = TreePickerTreePlaceholder;
TreePickerTree.EmptyState = TreePickerTreeEmptyState;
export default TreePickerTree;