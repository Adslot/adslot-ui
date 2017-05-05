import _ from 'lodash';
import DiffMatchPatch from 'diff-match-patch';
import React, { PropTypes } from 'react';

require('styles/alexandria/PrettyDiff.scss');

const PrettyDiffComponent = ({ newText, oldText }) => {
  const dmp = new DiffMatchPatch();
  const diffs = dmp.diff_main(oldText, newText);

  const getTextClass = (diffType) => {
    switch (diffType) {
      case DiffMatchPatch.DIFF_DELETE:
        return 'pretty-diff-component-delete';
      case DiffMatchPatch.DIFF_INSERT:
        return 'pretty-diff-component-insert';
      default:
        return 'pretty-diff-component-equal';
    }
  };

  return (
    <div className="pretty-diff-component">
      {_.map(diffs, (diff, index) =>
        <span key={index} className={getTextClass(diff[0])}>{diff[1]}</span>
      )}
    </div>
  );
};

PrettyDiffComponent.displayName = 'PrettyDiffComponent';

PrettyDiffComponent.propTypes = {
  newText: PropTypes.string.isRequired,
  oldText: PropTypes.string.isRequired,
};
PrettyDiffComponent.defaultProps = {
  newText: '',
  oldText: '',
};

export default PrettyDiffComponent;
