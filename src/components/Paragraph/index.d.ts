import * as React from 'react';

export type ParagraphChildren = string | React.ReactNode;

export type ParagraphClassName = string | string[];

export interface ParagraphProps {
  /**
   * The maximum character count for brief content
   */
  briefCharCount?: number;
  /**
   * A fallback maximum height for the brief content.
   * This height won't be exceeded, even if props.briefCharCount isn't reached
   * (e.g due to new lines in HTML)
   * @default 200
   */
  briefMaxHeight?: number;
  /**
   * Removes Read More button, only showing text in the current collapsed state
   */
  hideReadMore?: boolean;
  /**
   * initial collapsed state
   */
  defaultCollapsed?: boolean;
  /**
   * Content inside paragraph
   */
  children: ParagraphChildren;
  /**
   * Custom classnames
   */
  className?: ParagraphClassName;
  /**
   * Generate "data-test-selector" on the paragraph
   */
  dts?: string;
}

declare const Paragraph: React.FC<ParagraphProps> & {
  ReadMore: typeof Paragraph;
  HTML: typeof HTML;
};

export default Paragraph;

export interface HTMLProps {
  /**
   * Control the html truncation state
   */
  truncated?: boolean;
  /**
   * the string to append to truncated text
   * @default '...'
   */
  truncateString?: string;
  /**
   * HTML content
   */
  content?: string;
  /**
   * Optional parser to sanitize content with
   */
  parser?: (...args: any[]) => any;
  /**
   * limits the content to this length when truncated
   */
  briefCharCount?: number;
  dts?: string;
}

declare const HTML: React.FC<HTMLProps>;

declare const ReadMoreProdiver: React.FC;
