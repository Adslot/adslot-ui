import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapPagination from 'react-bootstrap/lib/Pagination';

class Pagination extends React.PureComponent {
  prevClickHandler = () => this.props.onSelect(this.props.activePage - 1);

  nextClickHandler = () => this.props.onSelect(this.props.activePage + 1);

  render() {
    const { activePage, items, onSelect } = this.props;

    const isFirst = activePage === 1;
    const prevProps = {
      disabled: isFirst,
      onClick: isFirst ? _.noop : this.prevClickHandler,
    };

    const isLast = activePage === items;
    const nextProps = {
      disabled: isLast,
      onClick: isLast ? _.noop : this.nextClickHandler,
    };

    return (
      <BootstrapPagination className="aui--pagination">
        {this.props.prev ? <BootstrapPagination.Prev {...prevProps} /> : null}

        {_.map(Array(items), (item, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === activePage;
          const itemProps = {
            active: isActive,
            disabled: isActive,
            onClick: isActive ? _.noop : () => onSelect(pageNumber),
          };

          return (
            <BootstrapPagination.Item {...itemProps} key={pageNumber}>
              {pageNumber}
            </BootstrapPagination.Item>
          );
        })}

        {this.props.next ? <BootstrapPagination.Next {...nextProps} /> : null}
      </BootstrapPagination>
    );
  }
}

Pagination.propTypes = {
  items: PropTypes.number.isRequired,
  activePage: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  next: PropTypes.bool,
  prev: PropTypes.bool,
};

Pagination.defaultProps = {
  activePage: 1,
  next: true,
  prev: true,
};

export default Pagination;
