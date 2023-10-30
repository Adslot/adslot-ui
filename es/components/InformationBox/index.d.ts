import * as React from 'react';

export type InformationBoxTheme = 'primary' | 'success' | 'warning' | 'error' | 'light';

export interface InformationBoxProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * oneOf: 'primary', 'success', 'warning', 'error', 'light'
   */
  theme?: InformationBoxTheme;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  dts?: string;
}

declare const InformationBox: React.FC<InformationBoxProps>;

export default InformationBox;
