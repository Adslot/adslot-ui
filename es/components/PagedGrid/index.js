import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Pagination from '../Pagination';
import Empty from '../Empty';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';
class PagedGrid extends React.PureComponent {
  state = {
    activePage: 1
  };
  static getDerivedStateFromProps(props, state) {
    const totalPages = Math.ceil(props.items.length / props.perPage);
    return state.activePage > totalPages ? {
      activePage: totalPages
    } : null;
  }
  render() {
    const {
      activePage
    } = this.state;
    const {
      columns,
      emptyMessage,
      emptySvgSymbol,
      items,
      perPage,
      verticalCellBorder
    } = this.props;
    const pageItems = _(items).clone().splice((this.state.activePage - 1) * perPage, perPage);
    const totalPages = Math.ceil(items.length / perPage);
    return /*#__PURE__*/React.createElement("div", {
      className: "pagedgrid-component"
    }, /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(GridRow, {
      type: "header",
      verticalCellBorder: verticalCellBorder
    }, _.map(columns, column => /*#__PURE__*/React.createElement(GridCell, {
      key: column.key,
      classSuffixes: [_.kebabCase(column.key)],
      stretch: column.stretch
    }, column.label))), _.map(pageItems, item => /*#__PURE__*/React.createElement(GridRow, {
      key: item.id,
      verticalCellBorder: verticalCellBorder
    }, _.map(columns, column => /*#__PURE__*/React.createElement(GridCell, {
      key: `${item.id}-${column.key}`,
      classSuffixes: [_.kebabCase(column.key)],
      stretch: column.stretch
    }, _.get(item, column.key))))), /*#__PURE__*/React.createElement(Empty, {
      collection: items,
      icon: emptySvgSymbol,
      text: emptyMessage
    })), totalPages > 1 ? /*#__PURE__*/React.createElement("div", {
      className: "pagedgrid-component-pagination"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pagedgrid-component-pagination-info"
    }, (activePage - 1) * perPage + 1, "\u2013", Math.min(activePage * perPage, items.length), " of ", items.length), /*#__PURE__*/React.createElement(Pagination, {
      activePage: activePage,
      pageCount: totalPages,
      next: true,
      onSelect: selectedPage => this.setState({
        activePage: selectedPage
      }),
      prev: true
    })) : null);
  }
}
const itemProps = PropTypes.shape({
  id: PropTypes.any.isRequired
});
const columnProps = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.any,
  stretch: PropTypes.bool
});
PagedGrid.propTypes = {
  columns: PropTypes.arrayOf(columnProps).isRequired,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  items: PropTypes.arrayOf(itemProps).isRequired,
  perPage: PropTypes.number.isRequired,
  verticalCellBorder: PropTypes.bool
};
export default PagedGrid;