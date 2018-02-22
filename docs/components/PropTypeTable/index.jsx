import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from '../../../src';

import './styles.scss';

class PropTypeTable extends React.PureComponent {
  render() {
    const { propTypes } = this.props;

    return (
      <div>
        <h3>PropTypes</h3>
        <div className="adslot-ui-proptype-table">
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
                    <pre>{propType}</pre>
                  </td>
                  <td>
                    <pre>{type}</pre>
                  </td>
                  <td>{defaultValue}</td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Empty
            collection={propTypes}
            hideIcon
            text="No PropType definitions for this component, please check the source-code."
          />
        </div>
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
  ).isRequired,
};

export default PropTypeTable;
