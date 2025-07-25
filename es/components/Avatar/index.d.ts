import * as React from 'react';

export type AvatarColor = 'blue' | 'green' | 'red' | 'orange' | 'cyan' | 'black';

export interface AvatarProps {
  /**
   * PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'cyan', 'black'])
   */
  color?: AvatarColor;
  givenName?: string;
  tooltip?: string;
  image?: string;
  surname?: string;
}

declare const Avatar: React.FC<AvatarProps>;

export default Avatar;
