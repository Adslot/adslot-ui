import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class BorderedWell extends PureComponent {
  render = () => (
    <div className="borderedwell-component">
      {this.props.children}
    </div>
  );
}

BorderedWell.displayName = 'AlexandriaBorderedWellComponent';

BorderedWell.propTypes = {
  children: PropTypes.node,
};

export default BorderedWell;
