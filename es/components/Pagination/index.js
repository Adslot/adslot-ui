import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

const Pagination = _ref => {
  let {
    className,
    activePage,
    pageCount,
    onSelect,
    prev,
    next
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('aui--pagination', className)
  }, activePage !== 1 && prev && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    onClick: () => onSelect(activePage - 1),
    className: classnames('aui--pagination-item', 'aui--pagination-sides')
  }, /*#__PURE__*/React.createElement("div", {
    className: "previous-icon"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    onClick: () => onSelect(1),
    className: classnames('aui--pagination-item', {
      active: activePage === 1
    })
  }, 1), activePage > 3 && pageCount !== 4 && pageCount !== 5 && /*#__PURE__*/React.createElement("div", {
    className: "aui--pagination-separator"
  }, "..."), activePage === 5 && pageCount === 5 && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    className: classnames('aui--pagination-item'),
    onClick: () => onSelect(activePage - 3)
  }, activePage - 3), (activePage === pageCount && pageCount > 3 || activePage === 4 && pageCount === 5) && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    onClick: () => onSelect(activePage - 2),
    className: classnames('aui--pagination-item')
  }, activePage - 2), activePage > 2 && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    className: classnames('aui--pagination-item'),
    onClick: () => onSelect(activePage - 1)
  }, activePage - 1), activePage !== 1 && activePage !== pageCount && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    onClick: () => onSelect(activePage),
    className: classnames('aui--pagination-item', 'active')
  }, activePage), activePage < pageCount - 1 && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    className: classnames('aui--pagination-item'),
    onClick: () => onSelect(activePage + 1)
  }, activePage + 1), (activePage === 1 && pageCount > 3 || activePage === 2 && pageCount === 5) && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    className: classnames('aui--pagination-item'),
    onClick: () => onSelect(activePage + 2)
  }, activePage + 2), activePage === 1 && pageCount === 5 && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    className: classnames('aui--pagination-item'),
    onClick: () => onSelect(activePage + 3)
  }, activePage + 3), activePage < pageCount - 2 && pageCount !== 4 && pageCount !== 5 && /*#__PURE__*/React.createElement("div", {
    className: "aui--pagination-separator"
  }, "..."), pageCount !== 1 && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    onClick: () => onSelect(pageCount),
    className: classnames('aui--pagination-item', {
      active: activePage === pageCount
    })
  }, pageCount), activePage !== pageCount && next && /*#__PURE__*/React.createElement(Button, {
    variant: "borderless",
    onClick: () => onSelect(activePage + 1),
    className: classnames('aui--pagination-item', 'aui--pagination-sides')
  }, /*#__PURE__*/React.createElement("div", {
    className: "next-icon"
  })));
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
  next: PropTypes.bool
};
Pagination.defaultProps = {
  activePage: 1,
  prev: true,
  next: true
};
export default Pagination;