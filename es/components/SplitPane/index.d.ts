import * as React from 'react';

export interface SplitPaneProps {
  additionalClassNames?: string[];
  children?: React.ReactNode;
  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts?: string;
}

declare const SplitPane: React.FC<SplitPaneProps>;

export default SplitPane;
