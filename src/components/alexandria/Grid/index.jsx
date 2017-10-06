import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { expandDts } from 'lib/utils';
import './styles.scss';

class Grid extends PureComponent {
  render = () => (
    <div className="grid-component" {...expandDts(this.props.dts)}>
      {this.props.children}
    </div>
  );
}

Grid.displayName = 'AlexandriaGridComponent';
Grid.propTypes = {
  children: PropTypes.node,
  dts: PropTypes.string,
};

export default Grid;
