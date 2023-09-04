import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useIsUnmounted from '../../hooks/useIsUnmounted';
import Search from '../Search';
import {
  useTreePickerGetState,
  useInternalActions,
  useTreePickerSearch,
  useTreePickerSlice,
} from './TreePickerContext';

import './TreePickerSearch.css';

const getIsInternalDisabled = (state) => state.isResolvingRoot || !!state.expandingNodeId;

const TreePickerSearch = ({ resolveNodes, className, disabled, ...rest }) => {
  const [isLoading, setIsLoading] = React.useState();

  const inputRef = React.useRef();
  const textRef = React.useRef('');
  const isUnmounted = useIsUnmounted();
  const search = useTreePickerSearch();
  const { searchTo } = useInternalActions();
  const internalDisable = useTreePickerSlice(getIsInternalDisabled);
  const getTreeState = useTreePickerGetState();

  // TODO fix Search
  React.useLayoutEffect(() => {
    inputRef.current.value = search;
  }, [search]);

  const isDisabled = disabled ?? internalDisable;

  return (
    <Search
      {...rest}
      ref={inputRef}
      disabled={isDisabled}
      className={cx('aui--tree-picker-search', 'aui--tree-picker-section', className)}
      isLoading={isLoading}
      showSearchButton={false}
      onSearch={async (searchText) => {
        if (!searchText) return searchTo();

        textRef.current = searchText;
        setIsLoading(true);
        try {
          const paths = getTreeState().paths;
          const currentNode = paths[paths.length - 1] || null;
          const nodes = await resolveNodes(searchText, currentNode);

          // ignore falsy nodes
          // or if search itself is unmounted
          // or when user types in quick succession
          // ignore the old search results
          if (!nodes || textRef.current !== searchText || isUnmounted()) return;

          searchTo(nodes, searchText);
        } catch (error) {
          console.error('[TreePickerSearch]', error);
        } finally {
          setIsLoading(false);
        }
      }}
      onClear={() => searchTo()}
    />
  );
};

TreePickerSearch.propTypes = {
  resolveNodes: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TreePickerSearch;
