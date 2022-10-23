import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import './styles.css';

const inclusiveRange = (start, end) => _.range(start, end + 1);

const Pagination = ({
  className,
  activePage: activePageProp,
  pageCount,
  siblingCount: siblingCountProp = 1,
  separator = '...',
  onSelect,
  prev,
  next,
}) => {
  const activePage = _.clamp(activePageProp, 1, pageCount);

  const pages = React.useMemo(() => {
    const siblingCount = _.clamp(siblingCountProp, 0, pageCount);
    // [first page] [separator] [sibling(s)] [activePage] [sibling(s)] [separator] [last page]
    const separatorCount = 2;
    const endsCount = 2;
    const centerCount = siblingCount * 2 + 1;
    const totalPageItems = centerCount + separatorCount;
    const totalItems = totalPageItems + endsCount;

    const offset = Math.floor(centerCount / 2);

    if (totalItems >= pageCount) {
      return inclusiveRange(1, pageCount);
    }

    const showLeftSeparator = activePage > offset + 2 && activePage <= pageCount;
    const showRightSeparator = activePage < pageCount - (offset + 2);

    if (showLeftSeparator && !showRightSeparator) {
      const rightRange = inclusiveRange(pageCount - totalPageItems + 1, pageCount);
      return [1, separator, ...rightRange];
    }

    if (!showLeftSeparator && showRightSeparator) {
      const leftRange = inclusiveRange(1, totalPageItems);

      return [...leftRange, separator, pageCount];
    }

    if (showLeftSeparator && showRightSeparator) {
      const centerRange = inclusiveRange(activePage - offset, activePage + offset);
      return [1, separator, ...centerRange, separator, pageCount];
    }
  }, [activePage, pageCount, separator, siblingCountProp]);

  return (
    <div data-testid="pagination-wrapper" className={classnames('aui--pagination', className)}>
      {prev && (
        <Button
          variant="borderless"
          onClick={() => onSelect(activePage - 1)}
          className={classnames('aui--pagination-item', 'aui--pagination-sides', {
            'aui--pagination-hidden': activePage === 1,
          })}
          icon={<div className="previous-icon" />}
          aria-label="Previous Page"
        />
      )}

      {pages.map((page, index) => {
        const active = activePage === page;
        if (page === separator)
          return (
            <div
              key={index}
              data-testid="pagination-ellipsis"
              className="aui--pagination-item aui--pagination-separator"
            >
              {separator}
            </div>
          );
        return (
          <Button
            key={index}
            variant={active ? 'solid' : 'borderless'}
            aria-current={active ? 'true' : undefined}
            color="default"
            onClick={() => onSelect(page)}
            className={classnames('aui--pagination-item', {
              active,
            })}
            aria-label={`Go to page ${page}`}
            icon={page}
          />
        );
      })}

      {next && (
        <Button
          variant="borderless"
          onClick={() => onSelect(activePage + 1)}
          className={classnames('aui--pagination-item', 'aui--pagination-sides', {
            'aui--pagination-hidden': activePage === pageCount,
          })}
          icon={<div className="next-icon" />}
          aria-label="Next Page"
        />
      )}
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  /**
   * The default active page, between 1 to the page count
   */
  activePage: PropTypes.number,
  /**
   * The max page count
   */
  pageCount: PropTypes.number.isRequired,
  /**
   * The number of pages to show on either side of the current page
   */
  siblingCount: PropTypes.number,
  /**
   * separator for truncated pages
   */
  separator: PropTypes.node,
  /**
   * A callback function for when clicking on previous, next and pagination items
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * The Prev Button is displayed or not
   */
  prev: PropTypes.bool,
  /**
   * The Next buton is displayed or not
   */
  next: PropTypes.bool,
};

Pagination.defaultProps = {
  activePage: 1,
  prev: true,
  next: true,
};

export default Pagination;
