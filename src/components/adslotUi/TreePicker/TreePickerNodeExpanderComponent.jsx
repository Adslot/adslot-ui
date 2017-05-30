import React, { PropTypes } from 'react';
import GridCell from 'components/alexandria/Grid/Cell';
import Spinner from 'components/alexandria/Spinner';

const TreePickerNodeExpander = ({
  isLoading,
  onClick,
}) => {
  const props = {
    dts: 'expander',
  };

  if (!isLoading) props.onClick = onClick;

  return (<GridCell {...props}>
    {isLoading ?
      <Spinner size="small" /> : <div className="treepickernode-component-expander" />
    }
  </GridCell>);
};

TreePickerNodeExpander.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

TreePickerNodeExpander.defaultProps = {
  isLoading: false,
};

export default TreePickerNodeExpander;
