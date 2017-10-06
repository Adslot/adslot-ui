import React, { Component } from 'react';
import './styles.scss';

class FlexibleSpacer extends Component {
  shouldComponentUpdate = () => false;

  render = () => <div className="flexible-spacer-component" />;
}

FlexibleSpacer.displayName = 'AlexandriaFlexibleSpacerComponent';

export default FlexibleSpacer;
