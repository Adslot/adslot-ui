import * as React from 'react';

export interface OverlayLoaderProps {
  heading?: string;
  text?: string;
  top?: number;
  disableBackground?: boolean;
}

declare const OverlayLoader: React.FC<OverlayLoaderProps>;

export default OverlayLoader;
