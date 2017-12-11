import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import DiffMatchPatch from 'diff-match-patch';
import './styles.scss';

const PrettyDiff = ({ newText, oldText }) => {
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

  return (
    <div className="pretty-diff-component">
      {_.map(diffs, (diff, index) => (
        <span key={index} className={getTextClass(diff[0])}>
          {diff[1]}
        </span>
      ))}
    </div>
  );
};

PrettyDiff.displayName = 'PrettyDiffComponent';

PrettyDiff.propTypes = {
  newText: PropTypes.string,
  oldText: PropTypes.string,
};
PrettyDiff.defaultProps = {
  newText: '',
  oldText: '',
};

export default PrettyDiff;
