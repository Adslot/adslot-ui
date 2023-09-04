import React from 'react';
import PropTypes from 'prop-types';
import { createStoreContext } from 'ryze';
import _ from 'lodash';

const { StoreProvider, useSlice, useStore } = createStoreContext();
const RenderNodeCtx = React.createContext();
export const HiddenByIdCtx = React.createContext({});

export const useRenderNode = () => React.useContext(RenderNodeCtx);
export const useHiddenById = () => React.useContext(HiddenByIdCtx);

export const TreePickerProvider = ({ children, renderNode }) => {
  return (
    <StoreProvider
      initialState={{
        paths: [],
        nodes: [],
        search: '',
        searchNodes: [],
        addable: {},
        isResolvingRoot: false,
        // keeps track of the latest expanding node
        expandingNodeId: '',
        expandableRef: { current: {} },
        // keeps track of which paths map to which nodes
        treeMapRef: { current: new Map() },
      }}
    >
      <RenderNodeCtx.Provider value={renderNode}>{children}</RenderNodeCtx.Provider>
    </StoreProvider>
  );
};

TreePickerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  renderNode: PropTypes.func.isRequired,
};

export const useTreePickerSlice = useSlice;

const getCurrentNode = (state) => state.paths[state.paths.length - 1];
export const useTreePickerCurrentNode = () => useTreePickerSlice(getCurrentNode);
export const useTreePickerPaths = () => useTreePickerSlice('paths');

const getNodesForRendering = (state) => (!!state.search ? state.searchNodes : state.nodes);
export const useTreePickerNodes = () => useTreePickerSlice(getNodesForRendering);

export const useTreePickerSearch = () => useTreePickerSlice('search');

export const useTreePickerGetState = () => {
  const store = useStore();
  return store.getState;
};

export const useInternalActions = () => {
  const { setState } = useStore();
  // breadcrumb navigate back to a node
  const backTo = React.useCallback(
    (nodeId) => {
      setState((prev) => {
        // nodeId: null -> go back to root
        // nodeId: undefined -> go back 1 level
        // nodeId: string -> go back to the node
        const newPaths =
          nodeId === null
            ? []
            : // if nodeId === undefined, index = -1, will end up slice without last item, if nodeId has a valid item, then index is positive
              prev.paths.slice(
                0,
                prev.paths.findIndex((entry) => entry.id === nodeId) + (nodeId === undefined ? 0 : 1)
              );

        const nodes = prev.treeMapRef.current.get(nodeId || newPaths[newPaths.length - 1]?.id || '');

        if (!nodes) {
          console.error('[TreePicker] Unexpected node id: ', nodeId);
          return prev;
        }

        return {
          ...prev,
          paths: newPaths,
          nodes,
          search: '',
        };
      });
    },
    [setState]
  );

  // expand new node & init root
  const goTo = React.useCallback(
    (nodes, node) => {
      setState((prev) => {
        if (!node) {
          // init root
          prev.treeMapRef.current.set('', nodes);

          return {
            ...prev,
            nodes: nodes,
            search: '',
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
          search: '',
        };
      });
    },
    [setState]
  );

  const searchTo = React.useCallback(
    (nodes, search) => {
      setState((prev) => {
        if (search) {
          return {
            ...prev,
            search: search,
            searchNodes: nodes,
          };
        }

        // clear search
        // const node = prev.paths[prev.paths.length - 1];
        // if node is falsy, assume it is searching in root
        // const newNodes = prev.treeMapRef.current.get(node ? node.id : '');
        return {
          ...prev,
          search: '',
          searchNodes: [],
        };
      });
    },
    [setState]
  );

  const addAddable = React.useCallback(
    (nodeId, addNode) => {
      setState((prev) => {
        if (!nodeId || !addNode) return prev;

        return prev.addable[nodeId]
          ? prev
          : {
              ...prev,
              addable: { ...prev.addable, [nodeId]: addNode },
            };
      });
    },
    [setState]
  );

  const removeAddable = React.useCallback(
    (nodeId) => {
      setState((prev) => {
        if (!nodeId) return prev;

        return !prev.addable[nodeId]
          ? prev
          : {
              ...prev,
              addable: _.pickBy(prev.addable, (_value, id) => id !== nodeId),
            };
      });
    },
    [setState]
  );

  const setIsResolvingRoot = React.useCallback(
    (newValue) => {
      setState((prev) => ({
        ...prev,
        isResolvingRoot: newValue,
      }));
    },
    [setState]
  );

  const setExpandingNodeId = React.useCallback(
    (nodeId, expanding) => {
      setState((prev) => ({
        ...prev,
        expandingNodeId: expanding ? nodeId : prev.expandingNodeId === nodeId ? '' : prev.expandingNodeId,
      }));
    },
    [setState]
  );

  return {
    backTo,
    goTo,
    searchTo,
    addAddable,
    removeAddable,
    setIsResolvingRoot,
    setExpandingNodeId,
  };
};

export const useTreePickerActions = () => {
  const { backTo, goTo, searchTo } = useInternalActions();
  return { backTo, goTo, searchTo };
};
