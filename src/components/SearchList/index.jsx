import _ from 'lodash';
import { Checkbox } from 'adslot-ui';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SearchList = ({ className, dts }) => {
  return (
    <div className={classnames('aui--search-list', className)} data-test-selector={dts}>
      <div>
        <Checkbox />
        <label>Foo</label>
      </div>
    </div>
  );
};

SearchList.propTypes = {
  //   className: PropTypes.string,
  //   /**
  //    * 	Milliseconds
  //    */
  //   debounceInterval: PropTypes.number,
  //   /**
  //    * 	Determine whether the text area is disabled
  //    */
  //   disabled: PropTypes.bool,
  //   /**
  //    * 	Render `data-test-selector` onto the component. It can be useful for testing
  //    */
  //   dts: PropTypes.string,
  //   /**
  //    * 	{ search: React.Node, loader: React.Node, close: React.Node }
  //    */
  //   icons: PropTypes.shape({
  //     search: PropTypes.node,
  //     loader: PropTypes.node,
  //     close: PropTypes.node,
  //   }),
  //   isLoading: PropTypes.bool,
  //   onChange: PropTypes.func,
  //   onClear: PropTypes.func,
  //   /**
  //    * 	Required
  //    */
  //   onSearch: PropTypes.func.isRequired,
  //   placeholder: PropTypes.string,
  //   /**
  //    * 	Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)
  //    */
  //   searchOnEnter: PropTypes.bool,
  //   value: PropTypes.string,
};

SearchList.defaultProps = {
  //   debounceInterval: 0,
  //   disabled: false,
  //   isLoading: false,
  //   searchOnEnter: false,
  //   placeholder: '',
  //   value: '',
  //   icons: {},
};

export default SearchList;
