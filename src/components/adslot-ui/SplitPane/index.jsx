// TODO: Move to Alexandria.
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { expandDts } from 'lib/utils';

require('./styles.scss');

class SplitPaneComponent extends PureComponent {
  render() {
    const { children, dts, additionalClassNames } = this.props;
    const splitPaneClass = classNames('splitpane-component', ...additionalClassNames);

    return (
      <div className={splitPaneClass} {...expandDts(dts)}>
        {children}
      </div>
    );
  }
}

SplitPaneComponent.displayName = 'AdslotUiSplitPaneComponent';
SplitPaneComponent.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  dts: PropTypes.string,
};
SplitPaneComponent.defaultProps = {
  additionalClassNames: [],
};
export default SplitPaneComponent;
