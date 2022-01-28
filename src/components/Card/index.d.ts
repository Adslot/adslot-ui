import * as React from 'react';

export interface CardProps {
  /**
   * arrayOf Card.Content
   */
  children: React.ReactNode;
  className?: string;
  accent?: string;
  dts?: string;
}

declare const Card: React.FC<CardProps>;

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  fill?: boolean;
  stretch?: boolean;
  append?: boolean;
  dts?: string;
}

declare const CardContent: React.FC<CardContentProps>;

declare const _default: {
  Container: typeof Card;
  Content: typeof CardContent;
};

export default _default;
