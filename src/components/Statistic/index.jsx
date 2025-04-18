import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Statistic = ({ label, value, inline = false }) => {
  const baseClass = 'statistic-component';
  const statisticClassNames = [baseClass];
  if (inline) statisticClassNames.push('inline');

  return (
    <label data-testid="statistic-wrapper" className={statisticClassNames.join(' ')}>
      <div data-testid="statistic-value" className={`${baseClass}-value`}>
        {value}
      </div>
      <div data-testid="statistic-label" className={`${baseClass}-label`}>
        {label}
      </div>
    </label>
  );
};

Statistic.propTypes = {
  /**
   * 	Horizontal layout as opposed to stacked.
   */
  inline: PropTypes.bool,
  /**
   * Preferred TitleCase (aka. PascalCase, StartCase)
   */
  label: PropTypes.string.isRequired,
  /**
   * Where value is a number consider human readable strings e.g 'Million' instead of 000,000.
   */
  value: PropTypes.string.isRequired,
};

export default Statistic;
