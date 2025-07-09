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

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  fill?: boolean;
  stretch?: boolean;
  append?: boolean;
  dts?: string;
}

declare const _default: {
  Container: React.FC<CardProps>;
  Content: React.FC<CardContentProps>;
};

export default _default;
