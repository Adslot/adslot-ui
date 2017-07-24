import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'components/alexandria/Grid';
import GridCell from 'components/alexandria/Grid/Cell';
import GridRow from 'components/alexandria/Grid/Row';

const Totals = ({ toSum, valueFormatter }) => (
  <Grid>
    {_(toSum)
      .reject({ isHidden: true })
      .map((item, index) =>
        <GridRow short horizontalBorder={false} key={index}>
          <GridCell stretch>{item.label}</GridCell>
          <GridCell dts={`${_.kebabCase(item.label)}-value`}>{valueFormatter(item.value)}</GridCell>
        </GridRow>
      )
      .value()}
    <GridRow short horizontalBorder={false} type="footer">
      <GridCell stretch>Total</GridCell>
      <GridCell dts="total-value">{valueFormatter(_.sumBy(toSum, 'value'))}</GridCell>
    </GridRow>
  </Grid>
);

Totals.displayName = 'AlexandriaTotalsComponent';

Totals.propTypes = {
  toSum: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number.isRequired,
      isHidden: PropTypes.bool,
    })
  ).isRequired,
  valueFormatter: PropTypes.func.isRequired,
};

Totals.defaultProps = {
  toSum: [],
  valueFormatter: (value) => `${value}`,
};

export default Totals;
