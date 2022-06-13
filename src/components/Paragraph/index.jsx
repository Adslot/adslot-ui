import _ from 'lodash';
import React from 'react';
import { htmlToText } from 'html-to-text';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import Button from '../Button';
import './styles.scss';

const Paragraph = ({ briefWordCount, content, className, dts, isHtml }) => {
  const [readMore, setReadMore] = React.useState(false);
  const baseClass = 'aui--paragraph';
  const paragraph = isHtml ? htmlToText(content, { wordwrap: false }) : content;
  const paragraphWordCount = _.get(paragraph, 'length');

  const brief = _.truncate(paragraph, {
    length: briefWordCount,
    separator: ' ',
  });

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <div data-testid="paragraph-wrapper" className={classnames(baseClass, className)} {...expandDts(dts)}>
      {!readMore && (
        <div data-testid="paragraph-brief" className="brief-content">
          {brief}
        </div>
      )}

      <div
        data-testid="paragraph-expandable-content"
        className={classnames('expandable-content', { expanded: readMore, collapsed: !readMore })}
      >
        {readMore ? paragraph : _.replace(paragraph, brief, '')}
      </div>

      {paragraphWordCount > briefWordCount && (
        <Button
          data-testid="paragraph-read-more-button"
          variant="link"
          className={`${baseClass}-read-more`}
          onClick={toggleReadMore}
        >
          {!readMore ? `Read More` : `Read Less`}
        </Button>
      )}
    </div>
  );
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
  isHtml: PropTypes.bool,
};

Paragraph.defaultProps = {
  briefWordCount: 255,
  isHtml: false,
};

export default Paragraph;
