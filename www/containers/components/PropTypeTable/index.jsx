import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from '../../../../src';

import './styles.scss';

class PropTypeTable extends React.PureComponent {
  render() {
    // eslint-disable-next-line
    const { propTypes, label } = this.props;
    const tableTitle = label ? `PropTypes — ${label}` : 'PropTypes';
    const isEmptyTable = _.isEmpty(propTypes);

    return (
      <div className="adslot-ui-proptype-table">
        <h3>{tableTitle}</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="col-prop-type">PropType</th>
              <th className="col-type">Type</th>
              <th className="col-default-value">Default Value</th>
              <th className="col-notes">Notes</th>
            </tr>
          </thead>
          <tbody>
            {_.map(propTypes, ({ propType, type, defaultValue, note }) => (
              <tr key={propType}>
                <td>
                  <code>{propType}</code>
                </td>
                <td>
                  <code>{type}</code>
                </td>
                <td>
                  <code>{defaultValue}</code>
                </td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEmptyTable ? (
          <Empty hideIcon text="No PropType definitions for this component, please check the source-code." />
        ) : null}
      </div>
    );
  }
}

PropTypeTable.propTypes = {
  propTypes: PropTypes.arrayOf(
    PropTypes.shape({
      propType: PropTypes.string.isRequired,
      type: PropTypes.node.isRequired,
      defaultValue: PropTypes.node,
      note: PropTypes.node,
    })
  ),
  label: PropTypes.string,
};

export default PropTypeTable;
