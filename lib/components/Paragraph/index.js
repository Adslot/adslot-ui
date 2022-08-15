"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _htmlToText = require("html-to-text");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var _Button = _interopRequireDefault(require("../Button"));

const Paragraph = _ref => {
  let {
    briefWordCount,
    content,
    className,
    dts,
    isHtml
  } = _ref;

  const [readMore, setReadMore] = _react.default.useState(false);

  const baseClass = 'aui--paragraph';
  const paragraph = isHtml ? (0, _htmlToText.htmlToText)(content, {
    wordwrap: false
  }) : content;

  const paragraphWordCount = _lodash.default.get(paragraph, 'length');

  const brief = _lodash.default.truncate(paragraph, {
    length: briefWordCount,
    separator: ' '
  });

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)(baseClass, className)
  }, (0, _utils.expandDts)(dts)), !readMore && /*#__PURE__*/_react.default.createElement("div", {
    className: "brief-content"
  }, brief), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('expandable-content', {
      expanded: readMore,
      collapsed: !readMore
    })
  }, readMore ? paragraph : _lodash.default.replace(paragraph, brief, '')), paragraphWordCount > briefWordCount && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "link",
    className: `${baseClass}-read-more`,
    onClick: toggleReadMore
  }, !readMore ? `Read More` : `Read Less`));
};

Paragraph.propTypes = {
  /**
   * 	The maximum of word count for brief content
   */
  briefWordCount: _propTypes.default.number.isRequired,

  /**
   * 	Content inside paragraph
   */
  content: _propTypes.default.string,

  /**
   *  	Custom classnames
   */
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),

  /**
   * 	Generate "data-test-selector" on the paragraph
   */
  dts: _propTypes.default.string,

  /**
   *    Define if the content is HTML type or not
   */
  isHtml: _propTypes.default.bool
};
Paragraph.defaultProps = {
  briefWordCount: 255,
  isHtml: false
};
var _default = Paragraph;
exports.default = _default;