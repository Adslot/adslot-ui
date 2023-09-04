import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Breadcrumb from '../Breadcrumb';
import { useInternalActions, useTreePickerPaths } from './TreePickerContext';

import './TreePickerNav.css';

const TreePickerNav = ({ rootLabel = 'All', className, onNavTo }) => {
  const paths = useTreePickerPaths();
  const { backTo } = useInternalActions();

  const rootNode = { id: '__all__', label: rootLabel };

  return paths.length === 0 ? null : (
    <Breadcrumb
      className={cx('aui--tree-picker-nav', 'aui--tree-picker-section', className)}
      rootNode={rootNode}
      divider="/"
      nodes={paths}
      onClick={(pathId) => {
        const newPath = pathId === rootNode.id ? null : pathId;
        backTo(newPath);
        onNavTo?.(newPath);
      }}
    />
  );
};

TreePickerNav.propTypes = {
  rootLabel: PropTypes.string,
  className: PropTypes.string,
  onNavTo: PropTypes.func,
};

export default TreePickerNav;
