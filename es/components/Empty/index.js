import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

var Empty = function Empty(_ref) {
  var collection = _ref.collection,
      text = _ref.text,
      icon = _ref.icon;

  if (_.isEmpty(collection)) {
    return /*#__PURE__*/React.createElement("div", {
      className: "empty-component"
    }, icon, /*#__PURE__*/React.createElement("div", {
      className: "empty-component-text"
    }, text));
  }

  return /*#__PURE__*/React.createElement("div", null);
};

Empty.propTypes = {
  collection: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  text: PropTypes.node,
  // can be string or, if you want rich formatting, a node
  icon: PropTypes.node
};
Empty.defaultProps = {
  text: 'Nothing to show.'
};
export default Empty;