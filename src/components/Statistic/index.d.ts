import * as React from 'react';

export interface StatisticProps {
  /**
   * Horizontal layout as opposed to stacked.
   */
  inline?: boolean;
  /**
   * Preferred TitleCase (aka. PascalCase, StartCase)
   */
  label: string;
  /**
   * Where value is a number consider human readable strings e.g 'Million' instead of 000,000.
   */
  value: string;
}

declare const Statistic: React.FC<StatisticProps>;

export default Statistic;
