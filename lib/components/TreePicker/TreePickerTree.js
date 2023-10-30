"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _lodash = _interopRequireDefault(require("lodash"));
var _useIsUnmounted = _interopRequireDefault(require("../../hooks/useIsUnmounted"));
var _Button = _interopRequireDefault(require("../Button"));
var _TreePickerContext = require("./TreePickerContext");
var _TreePickerNode = _interopRequireDefault(require("./TreePickerNode"));
var _utils = require("../../utils");
const TreePickerTreePlaceholder = ({
  count = 5
}) => {
  return Array(count).fill(0).map((_value, index) => /*#__PURE__*/_react.default.createElement(_TreePickerNode.default.Placeholder, {
    key: index
  }));
};
TreePickerTreePlaceholder.propTypes = {
  count: _propTypes.default.number
};
const getIsInRoot = state => state.paths.length === 0;
const TreePickerTreeEmptyState = ({
  title = 'No Results.'
}) => {
  const isInRoot = (0, _TreePickerContext.useTreePickerSlice)(getIsInRoot);
  const search = (0, _TreePickerContext.useTreePickerSearch)();
  const {
    backTo,
    searchTo
  } = (0, _TreePickerContext.useInternalActions)();
  const backAction = isInRoot ? null : /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "link",
    onClick: () => {
      backTo();
    }
  }, "Go Back");
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--tree-picker-empty"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "empty-title"
  }, title), search ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "link",
    onClick: () => {
      searchTo();
    }
  }, "Reset Search") : backAction);
};
TreePickerTreeEmptyState.propTypes = {
  title: _propTypes.default.node
};
const defaultPlaceholder = /*#__PURE__*/_react.default.createElement(TreePickerTreePlaceholder, null);
const defaultEmptyState = /*#__PURE__*/_react.default.createElement(TreePickerTreeEmptyState, null);
const TreePickerTree = ({
  className,
  resolveRootNodes,
  hiddenNodeIds,
  dts,
  placeholder = defaultPlaceholder,
  emptyState = defaultEmptyState
}) => {
  const isInRoot = (0, _TreePickerContext.useTreePickerSlice)(getIsInRoot);
  const nodes = (0, _TreePickerContext.useTreePickerNodes)();
  const renderNode = (0, _TreePickerContext.useRenderNode)();
  const {
    goTo,
    setIsResolvingRoot
  } = (0, _TreePickerContext.useInternalActions)();
  const isResolvingRoot = (0, _TreePickerContext.useTreePickerSlice)('isResolvingRoot');
  const isUnmounted = (0, _useIsUnmounted.default)();
  _react.default.useEffect(() => {
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
  const byId = _react.default.useMemo(() => _lodash.default.keyBy(hiddenNodeIds), [hiddenNodeIds]);
  const visibleNodes = nodes.filter(({
    id
  }) => !byId[id]);
  return /*#__PURE__*/_react.default.createElement(_TreePickerContext.HiddenByIdCtx.Provider, {
    value: byId
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)('aui--tree-picker-tree', className)
  }, (0, _utils.expandDts)(dts)), isResolvingRoot ? placeholder : visibleNodes.length === 0 ? emptyState : visibleNodes.map(renderNode)));
};
TreePickerTree.propTypes = {
  className: _propTypes.default.string,
  hiddenNodeIds: _propTypes.default.array,
  resolveRootNodes: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.node,
  emptyState: _propTypes.default.node,
  dts: _propTypes.default.string
};
TreePickerTree.Placeholder = TreePickerTreePlaceholder;
TreePickerTree.EmptyState = TreePickerTreeEmptyState;
var _default = exports.default = TreePickerTree;