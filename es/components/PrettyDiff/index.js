import _ from 'lodash';
import DiffMatchPatch from 'diff-match-patch';
import PropTypes from 'prop-types';
import React from 'react';

const PrettyDiff = _ref => {
  let {
    newText,
    oldText
  } = _ref;
  const dmp = new DiffMatchPatch();
  const diffs = dmp.diff_main(oldText, newText);

  const getTextClass = diffType => {
    switch (diffType) {
      case DiffMatchPatch.DIFF_DELETE:
        return 'pretty-diff-component-delete';

      case DiffMatchPatch.DIFF_INSERT:
        return 'pretty-diff-component-insert';

      default:
        return 'pretty-diff-component-equal';
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "pretty-diff-component"
  }, _.map(diffs, (diff, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    className: getTextClass(diff[0])
  }, diff[1])));
};

PrettyDiff.propTypes = {
  newText: PropTypes.string,
  oldText: PropTypes.string
};
PrettyDiff.defaultProps = {
  newText: '',
  oldText: ''
};
export default PrettyDiff;