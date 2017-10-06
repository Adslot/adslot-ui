import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DiffMatchPatch from 'diff-match-patch';
import './styles.scss';

class PrettyDiff extends PureComponent {
  getTextClass = (diffType) => {
    switch (diffType) {
      case DiffMatchPatch.DIFF_DELETE:
        return 'pretty-diff-component-delete';
      case DiffMatchPatch.DIFF_INSERT:
        return 'pretty-diff-component-insert';
      default:
        return 'pretty-diff-component-equal';
    }
  };

  dmp = new DiffMatchPatch();

  render() {
    const { newText, oldText } = this.props;

    const diffs = this.dmp.diff_main(oldText, newText);

    return (
      <div className="pretty-diff-component">
        {_.map(diffs, (diff, index) =>
          <span key={index} className={this.getTextClass(diff[0])}>{diff[1]}</span>
        )}
      </div>
    );
  }
}

PrettyDiff.displayName = 'PrettyDiffComponent';

PrettyDiff.propTypes = {
  newText: PropTypes.string.isRequired,
  oldText: PropTypes.string.isRequired,
};
PrettyDiff.defaultProps = {
  newText: '',
  oldText: '',
};

export default PrettyDiff;
