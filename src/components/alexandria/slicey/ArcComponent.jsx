import _ from 'lodash';
import React, { PropTypes } from 'react';

require('styles/alexandria/slicey/Arc.scss');

const ArcComponent = ({ data }) => {
  if (!data) {
    return (
      <path className="arc-component"></path>
    );
  }

  const dataString = `M0,0 L${data.x1},${data.y1} A0.5,0.5 0 ${data.largeArcFlag},1 ${data.x2},${data.y2} z`;
  return <path className={`arc-component ${_.kebabCase(data.label)}`} d={dataString}></path>;
};

ArcComponent.displayName = 'AlexandriaSliceyArcComponent';

ArcComponent.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    largeArcFlag: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
  }),
};

export default ArcComponent;
