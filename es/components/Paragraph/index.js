import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _ from 'lodash';
import React from 'react';
import { htmlToText } from 'html-to-text';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import Button from '../Button';

var Paragraph = function Paragraph(_ref) {
  var briefWordCount = _ref.briefWordCount,
      content = _ref.content,
      className = _ref.className,
      dts = _ref.dts,
      isHtml = _ref.isHtml;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      readMore = _React$useState2[0],
      setReadMore = _React$useState2[1];

  var baseClass = 'aui--paragraph';
  var paragraph = isHtml ? htmlToText(content, {
    wordwrap: false
  }) : content;

  var paragraphWordCount = _.get(paragraph, 'length');

  var brief = _.truncate(paragraph, {
    length: briefWordCount,
    separator: ' '
  });

  var toggleReadMore = function toggleReadMore() {
    setReadMore(!readMore);
  };

  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classnames(baseClass, className)
  }, expandDts(dts)), !readMore && /*#__PURE__*/React.createElement("div", {
    className: "brief-content"
  }, brief), /*#__PURE__*/React.createElement("div", {
    className: classnames('expandable-content', {
      expanded: readMore,
      collapsed: !readMore
    })
  }, readMore ? paragraph : _.replace(paragraph, brief, '')), paragraphWordCount > briefWordCount && /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    className: "".concat(baseClass, "-read-more"),
    onClick: toggleReadMore
  }, !readMore ? "Read More" : "Read Less"));
};

Paragraph.propTypes = {
  /**
   * 	The maximum of word count for brief content
   */
  briefWordCount: PropTypes.number.isRequired,

  /**
   * 	Content inside paragraph
   */
  content: PropTypes.string,

  /**
   *  	Custom classnames
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  /**
   * 	Generate "data-test-selector" on the paragraph
   */
  dts: PropTypes.string,

  /**
   *    Define if the content is HTML type or not
   */
  isHtml: PropTypes.bool
};
Paragraph.defaultProps = {
  briefWordCount: 255,
  isHtml: false
};
export default Paragraph;