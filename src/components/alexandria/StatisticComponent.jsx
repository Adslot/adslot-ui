import React, { PropTypes } from 'react';

require('styles/alexandria/Statistic.scss');

const StatisticComponent = ({ label, value, inline }) => {
  const baseClass = 'statistic-component';
  const statisticClassNames = [baseClass];
  if (inline) statisticClassNames.push('inline');

  return (
    <label className={statisticClassNames.join(' ')}>
      <div className={`${baseClass}-value`}>{value}</div>
      <div className={`${baseClass}-label`}>{label}</div>
    </label>
  );
};

StatisticComponent.displayName = 'AlexandriaStatisticComponent';

StatisticComponent.propTypes = {
  inline: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

StatisticComponent.defaultProps = {
  inline: false,
};

export default StatisticComponent;
