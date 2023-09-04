import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import useIsUnmounted from '../../hooks/useIsUnmounted';
import useCallbackRef from '../../hooks/useCallbackRef';
import PlusIcon from '../../styles/icons/plus.svg';
import FolderOpenIcon from '../../styles/icons/folder-open.svg';
import FolderIcon from '../../styles/icons/folder.svg';
import Button from '../Button';
import Skeleton from '../Skeleton';
import {
  useTreePickerGetState,
  useRenderNode,
  useInternalActions,
  useHiddenById,
  useTreePickerSlice,
} from './TreePickerContext';

import './TreePickerNode.css';

const TreePickerNodeContext = React.createContext({ level: 0 });

export const useTreePickerNode = () => React.useContext(TreePickerNodeContext);

const TreePickerNode = ({ className, children, node }) => {
  const { goTo } = useInternalActions();
  const [state, setState] = React.useState(() => ({ expanded: false, subNodes: [] }));

  const { level } = useTreePickerNode();

  const inlineExpand = React.useCallback(
    (nodes) => {
      setState((prev) => {
        if (!prev.expanded && nodes) {
          return { expanded: true, subNodes: nodes };
        }
        return { expanded: false, subNodes: [] };
      });
    },
    [setState]
  );

  const fullExpand = React.useCallback(
    (nodes) => {
      goTo(nodes, node);
    },
    [goTo, node]
  );

  const value = React.useMemo(
    () => ({
      level: level + 1,
      node,
      expanded: state.expanded,
      inlineExpand,
      fullExpand,
    }),
    [level, node, state.expanded, inlineExpand, fullExpand]
  );

  return (
    <TreePickerNodeContext.Provider value={value}>
      <div className={cx('aui--tree-picker-row', className)}>{children}</div>
      {state.subNodes.length === 0 ? null : <TreePickerNodeBranch nodes={state.subNodes} />}
    </TreePickerNodeContext.Provider>
  );
};
TreePickerNode.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

const TreePickerNodeBranch = ({ nodes }) => {
  const renderNode = useRenderNode();
  const { level } = useTreePickerNode();
  const byId = useHiddenById();

  const visibleNodes = nodes.filter(({ id }) => !byId[id]);

  return visibleNodes.length === 0 ? null : (
    <div className={cx('aui--tree-picker-node-branch', level % 2 === 0 ? 'is-even' : 'is-odd')}>
      {visibleNodes.map(renderNode)}
    </div>
  );
};

const TreePickerNodeContent = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={cx('aui--tree-picker-row-content', className)}>
      {children}
    </div>
  );
};
TreePickerNodeContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const getReverseIcon = (current) =>
  ({
    'folder-open': 'folder',
    folder: 'folder-open',
  }[current]);

const IconComponents = {
  'folder-open': FolderOpenIcon,
  folder: FolderIcon,
};

const getHasSearch = (state) => !!state.search;

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
  const [isHover, setIsHover] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setExpandingNodeId } = useInternalActions();
  const expandableRef = useTreePickerSlice('expandableRef');
  const { node, expanded, inlineExpand, fullExpand } = useTreePickerNode();
  const isUnmounted = useIsUnmounted();
  const getTreeState = useTreePickerGetState();
  const hasSearch = useTreePickerSlice(getHasSearch);

  const iconName = expanded ? 'folder-open' : 'folder';
  const ExpandIcon = IconComponents[isHover ? getReverseIcon(iconName) : iconName];

  const propExpand = inline ? inlineExpand : fullExpand;
  const defaultExpand = hasSearch ? inlineExpand : fullExpand;
  const shouldDefaultExpand = _.isNil(inline);

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
  React.useLayoutEffect(() => {
    if (!disabled) {
      expandableRef.current[node.id] = handleExpand;
      return;
    }
    delete expandableRef.current[node.id];
  });

  // when using default expand, on search reset it should go back to collapsed
  React.useEffect(() => {
    if (!hasSearch && shouldDefaultExpand) {
      inlineExpand();
    }
  }, [hasSearch, shouldDefaultExpand, inlineExpand]);

  return (
    <Button
      variant="borderless"
      aria-label="Expand"
      icon={<ExpandIcon className="aui--tree-picker-node-svg" />}
      {...rest}
      disabled={disabled}
      isLoading={isLoading}
      onClick={async (event) => {
        if (!resolveNodes) return onClick?.(event);
        await handleExpand();
        onClick?.(event);
      }}
      className={cx('aui--tree-picker-node-expand', className)}
      onMouseEnter={(event) => {
        setIsHover(true);
        return onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setIsHover(false);
        return onMouseLeave?.(event);
      }}
    />
  );
};
TreePickerNodeExpand.propTypes = {
  inline: PropTypes.bool,
  resolveNodes: PropTypes.func,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

const TreePickerNodeAdd = ({ className, onAdd, onClick, disabled = false, ...rest }) => {
  const { node } = useTreePickerNode();
  const { addAddable, removeAddable } = useInternalActions();
  const addNode = (isIncludeAll = false) => {
    onAdd(node, isIncludeAll);
  };
  const addNodeRef = useCallbackRef(addNode);

  // update addable based on disabled
  React.useEffect(() => {
    if (!disabled) {
      addAddable(node.id, addNodeRef);
    } else {
      removeAddable(node.id);
    }
  }, [node.id, addAddable, removeAddable, disabled, addNodeRef]);

  // remove addable when node unmounts
  React.useEffect(() => {
    return () => {
      removeAddable(node.id);
    };
  }, [node.id, removeAddable, addNodeRef]);

  return (
    <Button
      aria-label="Add"
      icon={<PlusIcon className="aui--tree-picker-node-svg" />}
      color="primary"
      variant="inverse"
      {...rest}
      disabled={disabled}
      onClick={(event) => {
        addNode();
        return onClick?.(event);
      }}
      className={cx('aui--tree-picker-node-add', className)}
    />
  );
};
TreePickerNodeAdd.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

const TreePickerNodePlaceholder = () => {
  return (
    <div className="aui--tree-picker-row">
      <TreePickerNodeContent>
        <Skeleton animated />
      </TreePickerNodeContent>
      <Skeleton animated variant="rect" width="20px" height="20px" />
      <Skeleton animated variant="rect" width="20px" height="20px" />
    </div>
  );
};

TreePickerNode.Content = TreePickerNodeContent;
TreePickerNode.Expand = TreePickerNodeExpand;
TreePickerNode.Add = TreePickerNodeAdd;
TreePickerNode.Placeholder = TreePickerNodePlaceholder;

export default TreePickerNode;
