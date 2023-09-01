import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import _ from 'lodash';
import Button from '../Button';
import { useTreePickerGetState, useTreePickerSlice } from './TreePickerContext';

import './TreePickerHeader.css';

const getNoAddable = (state) => _.isEmpty(state.addable);

const HeaderIncludeAll = ({ onIncludeAll }) => {
  const noAddable = useTreePickerSlice(getNoAddable);
  const getTreeState = useTreePickerGetState();

  return noAddable ? (
    <div className="aui--tree-picker-header-action-holder" />
  ) : (
    <Button
      variant="link"
      className="aui--tree-picker-header-include-all"
      onClick={() => {
        if (onIncludeAll) return onIncludeAll();

        const addable = getTreeState().addable;

        _.forEach(addable, (addNodeRef) => {
          addNodeRef.current(true);
        });
      }}
    >
      Include All
    </Button>
  );
};

const getCurrentNodeHeader = (state) => {
  const currentNode = state.paths[state.paths.length - 1];
  return currentNode?.header;
};

const TreePickerHeader = ({ children, className, onIncludeAll }) => {
  const header = useTreePickerSlice(getCurrentNodeHeader);

  const content = header || children;

  return !content ? null : (
    <div className={cc('aui--tree-picker-row', 'aui--tree-picker-header', className)}>
      <div className="aui--tree-picker-row-content">{content}</div>
      <HeaderIncludeAll onIncludeAll={onIncludeAll} />
    </div>
  );
};

TreePickerHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onIncludeAll: PropTypes.func,
};

export default TreePickerHeader;
