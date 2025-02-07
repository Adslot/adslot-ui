import PropTypes from 'prop-types';
import React from 'react';
import GridCell from '../../../Grid/Cell';
import Spinner from '../../../Spinner';

const TreePickerNodeExpander = ({ isLoading = false, onClick }) => {
  const props = {
    dts: 'expander',
    onClick: isLoading ? null : onClick,
  };

  return (
    <GridCell {...props}>
      {isLoading ? <Spinner size="small" /> : <div className="treepickernode-component-expander" />}
    </GridCell>
  );
};

TreePickerNodeExpander.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default TreePickerNodeExpander;
