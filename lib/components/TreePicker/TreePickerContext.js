"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTreePickerSlice = exports.useTreePickerSearch = exports.useTreePickerPaths = exports.useTreePickerNodes = exports.useTreePickerGetState = exports.useTreePickerCurrentNode = exports.useTreePickerActions = exports.useRenderNode = exports.useInternalActions = exports.useHiddenById = exports.TreePickerProvider = exports.HiddenByIdCtx = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ryze = require("ryze");
var _lodash = _interopRequireDefault(require("lodash"));
const {
  StoreProvider,
  useSlice,
  useStore
} = (0, _ryze.createStoreContext)();
const RenderNodeCtx = /*#__PURE__*/_react.default.createContext();
const HiddenByIdCtx = exports.HiddenByIdCtx = /*#__PURE__*/_react.default.createContext({});
const useRenderNode = () => _react.default.useContext(RenderNodeCtx);
exports.useRenderNode = useRenderNode;
const useHiddenById = () => _react.default.useContext(HiddenByIdCtx);
exports.useHiddenById = useHiddenById;
const TreePickerProvider = ({
  children,
  renderNode
}) => {
  return /*#__PURE__*/_react.default.createElement(StoreProvider, {
    initialState: {
      paths: [],
      nodes: [],
      search: '',
      searchNodes: [],
      addable: {},
      isResolvingRoot: false,
      // keeps track of the latest expanding node
      expandingNodeId: '',
      expandableRef: {
        current: {}
      },
      // keeps track of which paths map to which nodes
      treeMapRef: {
        current: new Map()
      }
    }
  }, /*#__PURE__*/_react.default.createElement(RenderNodeCtx.Provider, {
    value: renderNode
  }, children));
};
exports.TreePickerProvider = TreePickerProvider;
TreePickerProvider.propTypes = {
  children: _propTypes.default.node.isRequired,
  renderNode: _propTypes.default.func.isRequired
};
const useTreePickerSlice = exports.useTreePickerSlice = useSlice;
const getCurrentNode = state => state.paths[state.paths.length - 1];
const useTreePickerCurrentNode = () => useTreePickerSlice(getCurrentNode);
exports.useTreePickerCurrentNode = useTreePickerCurrentNode;
const useTreePickerPaths = () => useTreePickerSlice('paths');
exports.useTreePickerPaths = useTreePickerPaths;
const getNodesForRendering = state => !!state.search ? state.searchNodes : state.nodes;
const useTreePickerNodes = () => useTreePickerSlice(getNodesForRendering);
exports.useTreePickerNodes = useTreePickerNodes;
const useTreePickerSearch = () => useTreePickerSlice('search');
exports.useTreePickerSearch = useTreePickerSearch;
const useTreePickerGetState = () => {
  const store = useStore();
  return store.getState;
};
exports.useTreePickerGetState = useTreePickerGetState;
const useInternalActions = () => {
  const {
    setState
  } = useStore();
  // breadcrumb navigate back to a node
  const backTo = _react.default.useCallback(nodeId => {
    setState(prev => {
      // nodeId: null -> go back to root
      // nodeId: undefined -> go back 1 level
      // nodeId: string -> go back to the node
      const newPaths = nodeId === null ? [] :
      // if nodeId === undefined, index = -1, will end up slice without last item, if nodeId has a valid item, then index is positive
      prev.paths.slice(0, prev.paths.findIndex(entry => entry.id === nodeId) + (nodeId === undefined ? 0 : 1));
      const nodes = prev.treeMapRef.current.get(nodeId || newPaths[newPaths.length - 1]?.id || '');
      if (!nodes) {
        console.error('[TreePicker] Unexpected node id: ', nodeId);
        return prev;
      }
      return {
        ...prev,
        paths: newPaths,
        nodes,
        search: ''
      };
    });
  }, [setState]);

  // expand new node & init root
  const goTo = _react.default.useCallback((nodes, node) => {
    setState(prev => {
      if (!node) {
        // init root
        prev.treeMapRef.current.set('', nodes);
        return {
          ...prev,
          nodes: nodes,
          search: ''
        };
      }
      const currentNode = prev.paths[prev.paths.length - 1];
      // when node is the same as currentNode, do no change paths
      const newPaths = currentNode && currentNode.id === node.id ? prev.paths : [...prev.paths, node];
      prev.treeMapRef.current.set(node.id, nodes);
      return {
        ...prev,
        paths: newPaths,
        nodes: nodes,
        search: ''
      };
    });
  }, [setState]);
  const searchTo = _react.default.useCallback((nodes, search) => {
    setState(prev => {
      if (search) {
        return {
          ...prev,
          search: search,
          searchNodes: nodes
        };
      }

      // clear search
      // const node = prev.paths[prev.paths.length - 1];
      // if node is falsy, assume it is searching in root
      // const newNodes = prev.treeMapRef.current.get(node ? node.id : '');
      return {
        ...prev,
        search: '',
        searchNodes: []
      };
    });
  }, [setState]);
  const addAddable = _react.default.useCallback((nodeId, addNode) => {
    setState(prev => {
      if (!nodeId || !addNode) return prev;
      return prev.addable[nodeId] ? prev : {
        ...prev,
        addable: {
          ...prev.addable,
          [nodeId]: addNode
        }
      };
    });
  }, [setState]);
  const removeAddable = _react.default.useCallback(nodeId => {
    setState(prev => {
      if (!nodeId) return prev;
      return !prev.addable[nodeId] ? prev : {
        ...prev,
        addable: _lodash.default.pickBy(prev.addable, (_value, id) => id !== nodeId)
      };
    });
  }, [setState]);
  const setIsResolvingRoot = _react.default.useCallback(newValue => {
    setState(prev => ({
      ...prev,
      isResolvingRoot: newValue
    }));
  }, [setState]);
  const setExpandingNodeId = _react.default.useCallback((nodeId, expanding) => {
    setState(prev => ({
      ...prev,
      expandingNodeId: expanding ? nodeId : prev.expandingNodeId === nodeId ? '' : prev.expandingNodeId
    }));
  }, [setState]);
  return {
    backTo,
    goTo,
    searchTo,
    addAddable,
    removeAddable,
    setIsResolvingRoot,
    setExpandingNodeId
  };
};
exports.useInternalActions = useInternalActions;
const useTreePickerActions = () => {
  const {
    backTo,
    goTo,
    searchTo
  } = useInternalActions();
  return {
    backTo,
    goTo,
    searchTo
  };
};
exports.useTreePickerActions = useTreePickerActions;