import _ from 'lodash';
import { Empty, Grid, GridRow, GridCell, SvgSymbol } from 'alexandria-adslot';
import Pagination from 'react-bootstrap/lib/Pagination';
import React, { PropTypes } from 'react';

require('styles/adslotUi/PagedGrid.scss');

class PagedGridComponent extends React.Component {
  constructor() {
    super();
    this.state = { activePage: 1 };
  }

  componentWillReceiveProps() {
    const totalPages = Math.ceil(this.props.items.length / this.props.perPage);
    if (this.state.activePage > totalPages) this.setState({ activePage: totalPages });
  }

  render() {
    const { activePage } = this.state;
    const { columns, emptyIcon, emptyMessage, emptySvgSymbol, items, perPage } = this.props;
    const pageItems = _(items).clone().splice((this.state.activePage - 1) * perPage, perPage);
    const totalPages = Math.ceil(items.length / perPage);

    return (
      <div className="pagedgrid-component" >
        <Grid>
          <GridRow type="header" verticalCellBorder>
            {_.map(columns, (column) =>
              <GridCell key={column.key} classSuffixes={[_.kebabCase(column.key)]} stretch={column.stretch}>
                {column.label}
              </GridCell>
            )}
          </GridRow>
          {_.map(pageItems, (item) =>
            <GridRow key={item.id} verticalCellBorder>
              {_.map(columns, (column) =>
                <GridCell
                  key={`${item.id}-${column.key}`}
                  classSuffixes={[_.kebabCase(column.key)]}
                  stretch={column.stretch}
                >
                  {_.get(item, column.key)}
                </GridCell>
              )}
            </GridRow>
          )}
          <Empty collection={items} icon={emptyIcon} svgSymbol={emptySvgSymbol} text={emptyMessage} />
        </Grid>
        {totalPages > 1 ?
          <div className="pagedgrid-component-pagination">
            <span className="pagedgrid-component-pagination-info">
              {(activePage - 1) * perPage + 1}–{Math.min(activePage * perPage, items.length)} of {items.length}
            </span>
            <Pagination
              activePage={activePage}
              items={totalPages}
              next
              onSelect={(selectedPage) => this.setState({ activePage: selectedPage })}
              prev
            />
          </div> : null}
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
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  items: PropTypes.arrayOf(itemProps).isRequired,
  perPage: PropTypes.number.isRequired,
};

export default PagedGridComponent;
