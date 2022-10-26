import * as React from 'react';

export interface ArcData {
  label: string;
  id: number;
  largeArcFlag: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ArcProps {
  data?: ArcData;
}

declare const Arc: React.FC<ArcProps>;

export default Arc;
