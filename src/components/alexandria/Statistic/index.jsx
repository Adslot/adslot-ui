import React, { PropTypes } from 'react';
import './styles.scss';

const Statistic = ({ label, value, inline }) => {
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

Statistic.displayName = 'AlexandriaStatisticComponent';

Statistic.propTypes = {
  inline: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Statistic.defaultProps = {
  inline: false,
};

export default Statistic;
