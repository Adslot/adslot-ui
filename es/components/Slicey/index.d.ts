import * as React from 'react';

export interface SliceyDataset {
  label: string;
  value: number;
}

export interface SliceyProps {
  /**
   * Slicey will represent all values as percentage of the pie based on the sum of all values.
   * Label will provide a className to each slice as <code>.arc-component-{'${label}'}</code>.
   */
  dataset?: SliceyDataset[];
  diameter?: number;
  /**
   * Add a line across the radius at a set fraction of the whole e.g. .25 for ¼.
   */
  donut?: boolean;
  /**
   * Set to true if you wish the pie chart to have a hollow hole in the centre, like a donut :9
   */
  marker?: number;
}

declare const Slicey: React.FC<SliceyProps>;

export default Slicey;
