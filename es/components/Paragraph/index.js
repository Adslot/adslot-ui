import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
import RichTextEditor from '../RichTextEditor';
import Button from '../Button';
import { useCollapse } from '../../hooks/useCollapse';
const baseClass = 'aui--paragraph';
const Paragraph = ({
  briefMaxHeight = 200,
  hideReadMore,
  defaultCollapsed = true,
  className,
  children,
  dts
}) => {
  const hideReadMoreRef = React.useRef();
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const {
    height,
    collapsedHeightExceeded,
    containerRef
  } = useCollapse({
    collapsedHeight: briefMaxHeight,
    collapsed
  });
  return /*#__PURE__*/React.createElement(ReadMoreProdiver, {
    value: {
      collapsed,
      height,
      collapsedHeightExceeded,
      hideReadMoreRef
    }
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: classnames(baseClass, className)
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    style: {
      height
    },
    className: classnames('expandable-content', {
      'paragraph-fade-bottom': collapsedHeightExceeded && briefMaxHeight && collapsed
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "paragraph-content",
    ref: containerRef
  }, children)), hideReadMoreRef.current || !hideReadMore && (collapsedHeightExceeded || briefMaxHeight) && /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    className: `${baseClass}-read-more`,
    onClick: () => setCollapsed(!collapsed)
  }, collapsed ? `Read More` : `Read Less`)));
};
Paragraph.propTypes = {
  /**
   * 	The maximum character count for brief content
   */
  briefCharCount: PropTypes.number,
  /**
   * 	A fallback maximum height for the brief content.
   *  This height won't be exceeded, even if props.briefCharCount isn't reached
   *  (e.g due to new lines in HTML)
   *  @default 200
   */
  briefMaxHeight: PropTypes.number,
  /**
   * Removes Read More button, only showing text in the current collapsed state
   */
  hideReadMore: PropTypes.bool,
  /**
   * initial collapsed state
   */
  defaultCollapsed: PropTypes.bool,
  /**
   * 	Content inside paragraph
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   *  Custom classnames
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /**
   * 	Generate "data-test-selector" on the paragraph
   */
  dts: PropTypes.string
};
const ReadMoreContext = /*#__PURE__*/React.createContext({});
Paragraph.ReadMore = Paragraph;
const ReadMoreProdiver = ({
  children,
  value
}) => {
  return /*#__PURE__*/React.createElement(ReadMoreContext.Provider, {
    value: value
  }, children);
};
const useReadMoreCtx = () => React.useContext(ReadMoreContext);
const HTML = ({
  dts,
  truncated,
  content,
  briefCharCount = 240,
  truncateString = '...',
  parser
}) => {
  const editorState = RichTextEditor.stateFromHTML(content, {
    parser
  });
  const {
    collapsed,
    collapsedHeightExceeded,
    hideReadMoreRef
  } = useReadMoreCtx();
  const isInReadMore = !!hideReadMoreRef;
  const {
    truncatedState,
    totalCharCount
  } = RichTextEditor.useTruncateState({
    editorState,
    briefCharCount,
    truncateString
  });
  React.useLayoutEffect(() => {
    if (isInReadMore) {
      hideReadMoreRef.current = briefCharCount > totalCharCount && !collapsedHeightExceeded;
    }
  });
  const htmlContent = (collapsed || truncated) && totalCharCount ? RichTextEditor.stateToHTML(truncatedState) : RichTextEditor.stateToHTML(editorState);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: !isInReadMore ? baseClass : undefined
  }, expandDts(dts), {
    dangerouslySetInnerHTML: {
      __html: htmlContent
    }
  }));
};
HTML.propTypes = {
  /**
   * Control the html truncation state
   */
  truncated: PropTypes.bool,
  /**
   * the string to append to truncated text
   * @default '...'
   */
  truncateString: PropTypes.string,
  /**
   * HTML content
   */
  content: PropTypes.string,
  /**
   * Optional parser to sanitize content with
   */
  parser: PropTypes.func,
  /**
   * limits the content to this length when truncated
   */
  briefCharCount: PropTypes.number,
  dts: PropTypes.string
};
Paragraph.HTML = HTML;
export default Paragraph;