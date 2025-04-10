import * as React from 'react';

export interface PrettyDiffProps {
  newText?: string;
  oldText?: string;
}

declare const PrettyDiff: React.FC<PrettyDiffProps>;

export default PrettyDiff;
