import * as React from 'react';

export type ParagraphClassName = string | string[];

export interface ParagraphProps {
  /**
   * The maximum of word count for brief content
   */
  briefWordCount: number;
  /**
   * Content inside paragraph
   */
  content?: string;
  /**
   * Custom classnames
   */
  className?: ParagraphClassName;
  /**
   * Generate "data-test-selector" on the paragraph
   */
  dts?: string;
  /**
   * Define if the content is HTML type or not
   */
  isHtml?: boolean;
}

declare const Paragraph: React.FC<ParagraphProps>;

export default Paragraph;
