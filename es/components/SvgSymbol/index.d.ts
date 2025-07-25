import * as React from 'react';

export interface SvgSymbolProps {
  classSuffixes?: string[];
  /**
   * accept both file path and base64 encoded string
   */
  href?: string;
  onClick?: (...args: any[]) => any;
  isCircle?: boolean;
}

declare const SvgSymbol: React.FC<SvgSymbolProps>;

export default SvgSymbol;
