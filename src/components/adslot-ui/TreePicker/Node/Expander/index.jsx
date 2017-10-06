import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GridCell from 'alexandria/Grid/Cell';
import Spinner from 'alexandria/Spinner';

class TreePickerNodeExpander extends PureComponent {
  render() {
    const { isLoading, onClick } = this.props;

    // TODO: Should not be this way
    const props = { dts: 'expander' };

    // TODO: Not sure why this was done, should be changed
    if (!isLoading) props.onClick = onClick;

    return (<GridCell {...props}>
      {isLoading ?
        <Spinner size="small" /> : <div className="treepickernode-component-expander" />
      }
    </GridCell>);
  }
}

TreePickerNodeExpander.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

TreePickerNodeExpander.defaultProps = {
  isLoading: false,
};

export default TreePickerNodeExpander;
