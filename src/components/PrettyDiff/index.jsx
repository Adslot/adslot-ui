import _ from 'lodash';
import DiffMatchPatch from 'diff-match-patch';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

const PrettyDiff = ({ newText = '', oldText = '' }) => {
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
    <div data-testid="pretty-diff-wrapper" className="pretty-diff-component">
      {_.map(diffs, (diff, index) => (
        <span data-testid={getTextClass(diff[0])} key={index} className={getTextClass(diff[0])}>
          {diff[1]}
        </span>
      ))}
    </div>
  );
};

PrettyDiff.propTypes = {
  newText: PropTypes.string,
  oldText: PropTypes.string,
};

export default PrettyDiff;
