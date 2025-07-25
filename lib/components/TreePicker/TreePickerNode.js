"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTreePickerNode = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _lodash = _interopRequireDefault(require("lodash"));
var _useIsUnmounted = _interopRequireDefault(require("../../hooks/useIsUnmounted"));
var _useCallbackRef = _interopRequireDefault(require("../../hooks/useCallbackRef"));
var _Button = _interopRequireDefault(require("../Button"));
var _Skeleton = _interopRequireDefault(require("../Skeleton"));
var _TreePickerContext = require("./TreePickerContext");
var _utils = require("../../utils");
var PlusIcon = function PlusIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M8 2c-.3 0-.6.3-.6.6v4.8H2.6c-.3 0-.6.3-.6.6s.3.6.6.6h4.8v4.8c0 .3.3.6.6.6.2 0 .3-.1.4-.2s.2-.3.2-.4V8.6h4.8c.2 0 .3-.1.4-.2s.2-.2.2-.4c0-.3-.3-.6-.6-.6H8.6V2.6c0-.3-.3-.6-.6-.6"
  }));
};
PlusIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
};
var FolderOpenIcon = function FolderOpenIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M3 4C1.355 4 0 5.355 0 7v36.906a1 1 0 0 0 .063.688C.343 45.957 1.563 47 3 47h39c1.492 0 2.719-1.125 2.938-2.563.007-.062.027-.124.03-.187v-.063l.032-.156V44l4.969-26.813.031-.093V17c0-1.645-1.355-3-3-3v-3c0-1.645-1.355-3-3-3H18.031c.004.004-.008 0-.031 0a2 2 0 0 1-.281-.281c-.246-.282-.532-.75-.844-1.25-.313-.5-.648-1.032-1.063-1.5C15.399 4.5 14.82 4 14 4Zm0 2h11c-.063 0 .066 0 .313.281.246.282.53.75.843 1.25s.656 1.032 1.063 1.5c.406.469.96.969 1.781.969h26c.563 0 1 .438 1 1v3H8c-1.574 0-2.828 1.266-2.938 2.813h-.03L5 17 2 33.188V7c0-.563.438-1 1-1m5 10h39c.563 0 1 .438 1 1l-4.906 26.531-.032.063a1 1 0 0 0-.03.125 1 1 0 0 0-.032.125v.094c-.016.05-.023.101-.031.156-.004.031.004.062 0 .093a1 1 0 0 0 0 .126A1 1 0 0 1 42 45H3c-.563 0-1-.438-1-1l4.969-26.813.031-.093V17c0-.563.438-1 1-1"
  }));
};
FolderOpenIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "#1c1d1f",
  viewBox: "0 0 50 50"
};
var FolderIcon = function FolderIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 4C3.354 4 2 5.356 2 7v36c0 1.644 1.354 3 3 3h40c1.645 0 3-1.355 3-3V11c0-1.645-1.355-3-3-3H18c.087 0-.031 0-.275-.281s-.546-.75-.86-1.25c-.314-.501-.643-1.036-1.058-1.506S14.819 4 14 4zm0 2h9c-.06 0 .061.007.309.287.247.28.548.745.86 1.244.314.5.637 1.032 1.044 1.5.406.469.966.969 1.787.969h27c.563 0 1 .437 1 1v2.188A3 3 0 0 0 45 13H5c-.352 0-.685.074-1 .188V7c0-.564.436-1 1-1m0 9h40c.565 0 1 .435 1 1v27c0 .563-.437 1-1 1H5c-.564 0-1-.436-1-1V16c0-.565.435-1 1-1"
  }));
};
FolderIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "#1c1d1f",
  viewBox: "0 0 50 50"
};
const TreePickerNodeContext = /*#__PURE__*/_react.default.createContext({
  level: 0
});
const useTreePickerNode = () => _react.default.useContext(TreePickerNodeContext);
exports.useTreePickerNode = useTreePickerNode;
const TreePickerNode = ({
  className,
  children,
  node,
  dts
}) => {
  const {
    goTo
  } = (0, _TreePickerContext.useInternalActions)();
  const [state, setState] = _react.default.useState(() => ({
    expanded: false,
    subNodes: []
  }));
  const {
    level
  } = useTreePickerNode();
  const inlineExpand = _react.default.useCallback(nodes => {
    setState(prev => {
      if (!prev.expanded && nodes) {
        return {
          expanded: true,
          subNodes: nodes
        };
      }
      return {
        expanded: false,
        subNodes: []
      };
    });
  }, [setState]);
  const fullExpand = _react.default.useCallback(nodes => {
    goTo(nodes, node);
  }, [goTo, node]);
  const value = _react.default.useMemo(() => ({
    level: level + 1,
    node,
    expanded: state.expanded,
    inlineExpand,
    fullExpand
  }), [level, node, state.expanded, inlineExpand, fullExpand]);
  return /*#__PURE__*/_react.default.createElement(TreePickerNodeContext.Provider, {
    value: value
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)('aui--tree-picker-row', className)
  }, (0, _utils.expandDts)(dts)), children), state.subNodes.length === 0 ? null : /*#__PURE__*/_react.default.createElement(TreePickerNodeBranch, {
    nodes: state.subNodes
  }));
};
TreePickerNode.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node.isRequired,
  node: _propTypes.default.shape({
    id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
    label: _propTypes.default.string.isRequired
  }).isRequired,
  dts: _propTypes.default.string
};
const TreePickerNodeBranch = ({
  nodes
}) => {
  const renderNode = (0, _TreePickerContext.useRenderNode)();
  const {
    level
  } = useTreePickerNode();
  const byId = (0, _TreePickerContext.useHiddenById)();
  const visibleNodes = nodes.filter(({
    id
  }) => !byId[id]);
  return visibleNodes.length === 0 ? null : /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--tree-picker-node-branch', level % 2 === 0 ? 'is-even' : 'is-odd')
  }, visibleNodes.map(renderNode));
};
const TreePickerNodeContent = ({
  children,
  className,
  ...rest
}) => {
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
    className: (0, _classnames.default)('aui--tree-picker-row-content', className)
  }), children);
};
TreePickerNodeContent.propTypes = {
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string
};
const getReverseIcon = current => ({
  'folder-open': 'folder',
  folder: 'folder-open'
})[current];
const IconComponents = {
  'folder-open': FolderOpenIcon,
  folder: FolderIcon
};
const getHasSearch = state => !!state.search;
const TreePickerNodeExpand = ({
  className,
  inline,
  onClick,
  disabled,
  onMouseEnter,
  onMouseLeave,
  resolveNodes,
  ...rest
}) => {
  const [isHover, setIsHover] = _react.default.useState(false);
  const [isLoading, setIsLoading] = _react.default.useState(false);
  const {
    setExpandingNodeId
  } = (0, _TreePickerContext.useInternalActions)();
  const expandableRef = (0, _TreePickerContext.useTreePickerSlice)('expandableRef');
  const {
    node,
    expanded,
    inlineExpand,
    fullExpand
  } = useTreePickerNode();
  const isUnmounted = (0, _useIsUnmounted.default)();
  const getTreeState = (0, _TreePickerContext.useTreePickerGetState)();
  const hasSearch = (0, _TreePickerContext.useTreePickerSlice)(getHasSearch);
  const iconName = expanded ? 'folder-open' : 'folder';
  const ExpandIcon = IconComponents[isHover ? getReverseIcon(iconName) : iconName];
  const propExpand = inline ? inlineExpand : fullExpand;
  const defaultExpand = hasSearch ? inlineExpand : fullExpand;
  const shouldDefaultExpand = _lodash.default.isNil(inline);
  const handleExpand = async () => {
    setExpandingNodeId(node.id, true);
    const expandFunction = shouldDefaultExpand ? defaultExpand : propExpand;
    setIsLoading(true);
    try {
      const nodes = await resolveNodes();

      // ignore falsy nodes
      // or when user click 2 different expands, ignore the first click
      // or if node is unmounted
      if (!nodes || getTreeState().expandingNodeId !== node.id || isUnmounted()) return;
      expandFunction(nodes);
    } catch (error) {
      console.error('[TreePickerNodeExpand]', error);
    } finally {
      setIsLoading(false);
      setExpandingNodeId(node.id, false);
    }
  };

  // record the current expand node to ctx ref
  _react.default.useLayoutEffect(() => {
    if (!disabled) {
      expandableRef.current[node.id] = handleExpand;
      return;
    }
    delete expandableRef.current[node.id];
  });

  // when using default expand, on search reset it should go back to collapsed
  _react.default.useEffect(() => {
    if (!hasSearch && shouldDefaultExpand) {
      inlineExpand();
    }
  }, [hasSearch, shouldDefaultExpand, inlineExpand]);
  return /*#__PURE__*/_react.default.createElement(_Button.default, Object.assign({
    variant: "borderless",
    "aria-label": "Expand",
    icon: /*#__PURE__*/_react.default.createElement(ExpandIcon, {
      className: "aui--tree-picker-node-svg"
    })
  }, rest, {
    disabled: disabled,
    isLoading: isLoading,
    onClick: async event => {
      if (!resolveNodes) return onClick?.(event);
      await handleExpand();
      onClick?.(event);
    },
    className: (0, _classnames.default)('aui--tree-picker-node-expand', className),
    onMouseEnter: event => {
      setIsHover(true);
      return onMouseEnter?.(event);
    },
    onMouseLeave: event => {
      setIsHover(false);
      return onMouseLeave?.(event);
    }
  }));
};
TreePickerNodeExpand.propTypes = {
  inline: _propTypes.default.bool,
  resolveNodes: _propTypes.default.func,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func
};
const TreePickerNodeAdd = ({
  className,
  onAdd,
  onClick,
  disabled = false,
  ...rest
}) => {
  const {
    node
  } = useTreePickerNode();
  const {
    addAddable,
    removeAddable
  } = (0, _TreePickerContext.useInternalActions)();
  const addNode = (isIncludeAll = false) => {
    onAdd(node, isIncludeAll);
  };
  const addNodeRef = (0, _useCallbackRef.default)(addNode);

  // update addable based on disabled
  _react.default.useEffect(() => {
    if (!disabled) {
      addAddable(node.id, addNodeRef);
    } else {
      removeAddable(node.id);
    }
  }, [node.id, addAddable, removeAddable, disabled, addNodeRef]);

  // remove addable when node unmounts
  _react.default.useEffect(() => {
    return () => {
      removeAddable(node.id);
    };
  }, [node.id, removeAddable, addNodeRef]);
  return /*#__PURE__*/_react.default.createElement(_Button.default, Object.assign({
    "aria-label": "Add",
    icon: /*#__PURE__*/_react.default.createElement(PlusIcon, {
      className: "aui--tree-picker-node-svg"
    }),
    color: "primary",
    variant: "inverse"
  }, rest, {
    disabled: disabled,
    onClick: event => {
      addNode();
      return onClick?.(event);
    },
    className: (0, _classnames.default)('aui--tree-picker-node-add', className)
  }));
};
TreePickerNodeAdd.propTypes = {
  onAdd: _propTypes.default.func.isRequired,
  onClick: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string
};
const TreePickerNodePlaceholder = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--tree-picker-row"
  }, /*#__PURE__*/_react.default.createElement(TreePickerNodeContent, null, /*#__PURE__*/_react.default.createElement(_Skeleton.default, {
    animated: true
  })), /*#__PURE__*/_react.default.createElement(_Skeleton.default, {
    animated: true,
    variant: "rect",
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/_react.default.createElement(_Skeleton.default, {
    animated: true,
    variant: "rect",
    width: "20px",
    height: "20px"
  }));
};
TreePickerNode.Content = TreePickerNodeContent;
TreePickerNode.Expand = TreePickerNodeExpand;
TreePickerNode.Add = TreePickerNodeAdd;
TreePickerNode.Placeholder = TreePickerNodePlaceholder;
var _default = exports.default = TreePickerNode;