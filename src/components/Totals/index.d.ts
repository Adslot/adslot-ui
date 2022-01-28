import * as React from 'react';

export interface TotalsToSum {
  label?: React.ReactNode;
  value: number;
  isHidden?: boolean;
}

export interface TotalsProps {
  /**
   * { label: PropTypes.node, value: PropTypes.number.isRequired, isHidden: PropTypes.bool }
   */
  toSum?: TotalsToSum[];
  valueFormatter?: (...args: any[]) => any;
}

declare const Totals: React.FC<TotalsProps>;

export default Totals;
