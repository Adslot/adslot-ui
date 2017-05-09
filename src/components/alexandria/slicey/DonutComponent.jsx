import React from 'react';

require('styles/alexandria/slicey/Donut.scss');

const DonutComponent = () => (
  <circle className="donut-component" r=".45" cx="0" cy="0"></circle>
);

DonutComponent.displayName = 'AlexandriaSliceyDonutComponent';

export default DonutComponent;
