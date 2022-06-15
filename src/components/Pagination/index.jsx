import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import './styles.css';

const Pagination = ({ className, activePage, pageCount, onSelect, prev, next }) => (
  <div data-testid="pagination-wrapper" className={classnames('aui--pagination', className)}>
    {activePage !== 1 && prev && (
      <Button
        variant="borderless"
        onClick={() => onSelect(activePage - 1)}
        className={classnames('aui--pagination-item', 'aui--pagination-sides')}
      >
        <div className="previous-icon" />
      </Button>
    )}

    <Button
      variant="borderless"
      onClick={() => onSelect(1)}
      className={classnames('aui--pagination-item', {
        active: activePage === 1,
      })}
    >
      {1}
    </Button>

    {activePage > 3 && pageCount !== 4 && pageCount !== 5 && (
      <div data-testid="pagination-left-ellipsis" className="aui--pagination-separator">
        ...
      </div>
    )}

    {activePage === 5 && pageCount === 5 && (
      <Button
        variant="borderless"
        className={classnames('aui--pagination-item')}
        onClick={() => onSelect(activePage - 3)}
      >
        {activePage - 3}
      </Button>
    )}

    {((activePage === pageCount && pageCount > 3) || (activePage === 4 && pageCount === 5)) && (
      <Button
        variant="borderless"
        onClick={() => onSelect(activePage - 2)}
        className={classnames('aui--pagination-item')}
      >
        {activePage - 2}
      </Button>
    )}

    {activePage > 2 && (
      <Button
        variant="borderless"
        className={classnames('aui--pagination-item')}
        onClick={() => onSelect(activePage - 1)}
      >
        {activePage - 1}
      </Button>
    )}

    {activePage !== 1 && activePage !== pageCount && (
      <Button
        variant="borderless"
        onClick={() => onSelect(activePage)}
        className={classnames('aui--pagination-item', 'active')}
      >
        {activePage}
      </Button>
    )}

    {activePage < pageCount - 1 && (
      <Button
        variant="borderless"
        className={classnames('aui--pagination-item')}
        onClick={() => onSelect(activePage + 1)}
      >
        {activePage + 1}
      </Button>
    )}

    {((activePage === 1 && pageCount > 3) || (activePage === 2 && pageCount === 5)) && (
      <Button
        variant="borderless"
        className={classnames('aui--pagination-item')}
        onClick={() => onSelect(activePage + 2)}
      >
        {activePage + 2}
      </Button>
    )}

    {activePage === 1 && pageCount === 5 && (
      <Button
        variant="borderless"
        className={classnames('aui--pagination-item')}
        onClick={() => onSelect(activePage + 3)}
      >
        {activePage + 3}
      </Button>
    )}

    {activePage < pageCount - 2 && pageCount !== 4 && pageCount !== 5 && (
      <div data-testid="pagination-right-ellipsis" className="aui--pagination-separator">
        ...
      </div>
    )}

    {pageCount !== 1 && (
      <Button
        variant="borderless"
        onClick={() => onSelect(pageCount)}
        className={classnames('aui--pagination-item', {
          active: activePage === pageCount,
        })}
      >
        {pageCount}
      </Button>
    )}

    {activePage !== pageCount && next && (
      <Button
        variant="borderless"
        onClick={() => onSelect(activePage + 1)}
        className={classnames('aui--pagination-item', 'aui--pagination-sides')}
      >
        <div className="next-icon" />
      </Button>
    )}
  </div>
);

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
