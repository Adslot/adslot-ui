import * as React from 'react';
import Panel from '../Panel';

export type AccordionMaxExpand = number | 'max';

export interface AccordionProps {
  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts?: string;
  /**
   * onPanelClick(panelId) takes in a single parameter which is the id of the clicked panel.
   */
  onPanelClick?: (...args: any[]) => any;
  /**
   * <span>
   * Accept an array of <a href="/panel-example">Panel</a> or
   * <a href="/accordion-panel-example">Accordion.Panel</a>
   * </span>
   */
  children?: React.ReactNode;
  defaultActivePanelIds?: string[];
  /**
   * Determine how many Panels can be expanded, accepted value is a positive number, or <code>max</code> to have no restriction
   */
  maxExpand?: AccordionMaxExpand;
}

declare const Accordion: React.FC<AccordionProps> & {
  Panel: typeof Panel;
};

export default Accordion;
