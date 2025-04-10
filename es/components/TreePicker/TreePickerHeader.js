import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import _ from 'lodash';
import Button from '../Button';
import { useTreePickerGetState, useTreePickerSlice } from './TreePickerContext';
import { expandDts } from '../../utils';
const getNoAddable = state => _.isEmpty(state.addable);
const HeaderAddAll = () => {
  const noAddable = useTreePickerSlice(getNoAddable);
  const getTreeState = useTreePickerGetState();
  return noAddable ? /*#__PURE__*/React.createElement("div", {
    className: "aui--tree-picker-header-action-holder"
  }) : /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    className: "aui--tree-picker-header-add-all",
    onClick: () => {
      const addable = getTreeState().addable;
      _.forEach(addable, addNodeRef => {
        addNodeRef.current(true);
      });
    }
  }, "Include All");
};
const getCurrentNodeHeader = state => {
  const currentNode = state.paths[state.paths.length - 1];
  return currentNode?.header;
};
const TreePickerHeader = ({
  children,
  className,
  label,
  dts
}) => {
  const header = useTreePickerSlice(getCurrentNodeHeader);
  const finalLabel = !_.isUndefined(header) ? header : label;
  return !finalLabel ? null : /*#__PURE__*/React.createElement("div", Object.assign({
    className: cc('aui--tree-picker-row', 'aui--tree-picker-header', className)
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    className: "aui--tree-picker-row-content"
  }, finalLabel), children ?? /*#__PURE__*/React.createElement(HeaderAddAll, null));
};
TreePickerHeader.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  dts: PropTypes.string
};
export default TreePickerHeader;