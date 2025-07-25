"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../../utils");
var _RichTextEditor = _interopRequireDefault(require("../RichTextEditor"));
var _Button = _interopRequireDefault(require("../Button"));
var _useCollapse = require("../../hooks/useCollapse");
const baseClass = 'aui--paragraph';
const Paragraph = ({
  briefMaxHeight = 200,
  hideReadMore,
  defaultCollapsed = true,
  className,
  children,
  dts
}) => {
  const hideReadMoreRef = _react.default.useRef();
  const [collapsed, setCollapsed] = _react.default.useState(defaultCollapsed);
  const {
    height,
    collapsedHeightExceeded,
    containerRef
  } = (0, _useCollapse.useCollapse)({
    collapsedHeight: briefMaxHeight,
    collapsed
  });
  return /*#__PURE__*/_react.default.createElement(ReadMoreProdiver, {
    value: {
      collapsed,
      height,
      collapsedHeightExceeded,
      hideReadMoreRef
    }
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)(baseClass, className)
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height
    },
    className: (0, _classnames.default)('expandable-content', {
      'paragraph-fade-bottom': collapsedHeightExceeded && briefMaxHeight && collapsed
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "paragraph-content",
    ref: containerRef
  }, children)), hideReadMoreRef.current || !hideReadMore && (collapsedHeightExceeded || briefMaxHeight) && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "link",
    className: `${baseClass}-read-more`,
    onClick: () => setCollapsed(!collapsed)
  }, collapsed ? `Read More` : `Read Less`)));
};
Paragraph.propTypes = {
  /**
   * 	The maximum character count for brief content
   */
  briefCharCount: _propTypes.default.number,
  /**
   * 	A fallback maximum height for the brief content.
   *  This height won't be exceeded, even if props.briefCharCount isn't reached
   *  (e.g due to new lines in HTML)
   *  @default 200
   */
  briefMaxHeight: _propTypes.default.number,
  /**
   * Removes Read More button, only showing text in the current collapsed state
   */
  hideReadMore: _propTypes.default.bool,
  /**
   * initial collapsed state
   */
  defaultCollapsed: _propTypes.default.bool,
  /**
   * 	Content inside paragraph
   */
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]).isRequired,
  /**
   *  Custom classnames
   */
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  /**
   * 	Generate "data-test-selector" on the paragraph
   */
  dts: _propTypes.default.string
};
const ReadMoreContext = /*#__PURE__*/_react.default.createContext({});
Paragraph.ReadMore = Paragraph;
const ReadMoreProdiver = ({
  children,
  value
}) => {
  return /*#__PURE__*/_react.default.createElement(ReadMoreContext.Provider, {
    value: value
  }, children);
};
const useReadMoreCtx = () => _react.default.useContext(ReadMoreContext);
const HTML = ({
  dts,
  truncated,
  content,
  briefCharCount = 240,
  truncateString = '...',
  parser
}) => {
  const editorState = _RichTextEditor.default.stateFromHTML(content, {
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
  } = _RichTextEditor.default.useTruncateState({
    editorState,
    briefCharCount,
    truncateString
  });
  _react.default.useLayoutEffect(() => {
    if (isInReadMore) {
      hideReadMoreRef.current = briefCharCount > totalCharCount && !collapsedHeightExceeded;
    }
  });
  const htmlContent = (collapsed || truncated) && totalCharCount ? _RichTextEditor.default.stateToHTML(truncatedState) : _RichTextEditor.default.stateToHTML(editorState);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: !isInReadMore ? baseClass : undefined
  }, (0, _utils.expandDts)(dts), {
    dangerouslySetInnerHTML: {
      __html: htmlContent
    }
  }));
};
HTML.propTypes = {
  /**
   * Control the html truncation state
   */
  truncated: _propTypes.default.bool,
  /**
   * the string to append to truncated text
   * @default '...'
   */
  truncateString: _propTypes.default.string,
  /**
   * HTML content
   */
  content: _propTypes.default.string,
  /**
   * Optional parser to sanitize content with
   */
  parser: _propTypes.default.func,
  /**
   * limits the content to this length when truncated
   */
  briefCharCount: _propTypes.default.number,
  dts: _propTypes.default.string
};
Paragraph.HTML = HTML;
var _default = exports.default = Paragraph;