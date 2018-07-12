import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from '../../../src';

import './styles.scss';

class PropTypeTable extends React.PureComponent {
  render() {
    const { label, props } = this.props;
    const tableTitle = label ? `PropTypes — ${label}` : 'PropTypes';
    const isEmptyTable =  _.isEmpty(props);

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
              <th className="col-required text-center">Required</th>
            </tr>
          </thead>
          <tbody>
            {_.map(props, ({ type, defaultValue, description, required }, name) => {
              const enumString = type.name === 'enum' ? ` of: ${_.map(type.value, 'value').join(', ')}` : '';
              return <tr key={name}>
                <td><code>{name}</code></td>
                <td><code>{type.name}{enumString}</code></td>
                <td><code>{defaultValue ? defaultValue.value : null}</code></td>
                <td><i>{description}</i></td>
                <td className="text-center">{required ? <input type="checkbox" read-only checked /> : null}</td>
              </tr>
            })}

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
  props: PropTypes.object, // eslint-disable-line
  label: PropTypes.string,
};

export default PropTypeTable;
