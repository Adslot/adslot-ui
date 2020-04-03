import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';
import Empty from '../Empty';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';
import './styles.scss';

class PagedGridComponent extends React.PureComponent {
  state = { activePage: 1 };

  static getDerivedStateFromProps(props, state) {
    const totalPages = Math.ceil(props.items.length / props.perPage);

    return state.activePage > totalPages ? { activePage: totalPages } : null;
  }

  render() {
    const { activePage } = this.state;
    const { columns, emptyIcon, emptyMessage, emptySvgSymbol, items, perPage, verticalCellBorder } = this.props;
    const pageItems = _(items)
      .clone()
      .splice((this.state.activePage - 1) * perPage, perPage);
    const totalPages = Math.ceil(items.length / perPage);

    return (
      <div className="pagedgrid-component">
        <Grid>
          <GridRow type="header" verticalCellBorder={verticalCellBorder}>
            {_.map(columns, column => (
              <GridCell key={column.key} classSuffixes={[_.kebabCase(column.key)]} stretch={column.stretch}>
                {column.label}
              </GridCell>
            ))}
          </GridRow>
          {_.map(pageItems, item => (
            <GridRow key={item.id} verticalCellBorder={verticalCellBorder}>
              {_.map(columns, column => (
                <GridCell
                  key={`${item.id}-${column.key}`}
                  classSuffixes={[_.kebabCase(column.key)]}
                  stretch={column.stretch}
                >
                  {_.get(item, column.key)}
                </GridCell>
              ))}
            </GridRow>
          ))}
          <Empty collection={items} icon={emptyIcon} svgSymbol={emptySvgSymbol} text={emptyMessage} />
        </Grid>
        {totalPages > 1 ? (
          <div className="pagedgrid-component-pagination">
            <span className="pagedgrid-component-pagination-info">
              {(activePage - 1) * perPage + 1}–{Math.min(activePage * perPage, items.length)} of {items.length}
            </span>
            <Pagination
              activePage={activePage}
              items={totalPages}
              next
              onSelect={selectedPage => this.setState({ activePage: selectedPage })}
              prev
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const itemProps = PropTypes.shape({
  id: PropTypes.any.isRequired,
});

const columnProps = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.any,
  stretch: PropTypes.bool,
});

PagedGridComponent.propTypes = {
  columns: PropTypes.arrayOf(columnProps).isRequired,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  items: PropTypes.arrayOf(itemProps).isRequired,
  perPage: PropTypes.number.isRequired,
  verticalCellBorder: PropTypes.bool,
};

export default PagedGridComponent;
