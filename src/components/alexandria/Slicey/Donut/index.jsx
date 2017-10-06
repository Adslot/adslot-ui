import React, { Component } from 'react';
import './styles.scss';

class Donut extends Component {
  shouldComponentUpdate = () => false;

  render = () => <circle className="donut-component" r=".45" cx="0" cy="0"></circle>;
}

Donut.displayName = 'AlexandriaSliceyDonutComponent';

export default Donut;
