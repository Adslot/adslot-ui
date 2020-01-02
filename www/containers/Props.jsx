import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import HtmlParser from 'react-html-parser';
import props from './props.json';

const componentNameMapper = {
  Tag: 'TagComponent',
};

const Props = ({ componentName, customMapper }) => {
  const componentExports = customMapper
    ? customMapper(props)
    : props[`src/components/${componentName}/index.jsx`] || [];
  const componentProps =
    componentExports.length === 1
      ? componentExports[0]
      : componentExports.find(
          component =>
            component.displayName === componentName || component.displayName === componentNameMapper[componentName]
        );

  if (componentProps) {
    return (
      <React.Fragment>
        <div className="aui--docs-ui-proptype-table">
          <h3>PropTypes</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="col-prop-type">PropType</th>
                <th className="col-type">Type</th>
                <th className="col-type">Required</th>
                <th className="col-default-value">Default Value</th>
                <th className="col-notes">Description</th>
              </tr>
            </thead>
            <tbody>
              {_.map(componentProps.props, (prop, key) => (
                <tr key={key}>
                  <td>
                    <code>{key}</code>
                  </td>
                  <td>
                    <code>{HtmlParser(_.get(prop, 'type.name'), '')}</code>
                    <code> {HtmlParser(_.get(prop, 'type.value') ? prop.type.value.name : '')}</code>
                  </td>
                  <td>
                    <code>{HtmlParser(_.get(prop, 'required', ''))}</code>
                  </td>
                  <td>
                    <code>{HtmlParser(_.get(prop, 'defaultValue.value', ''))}</code>
                  </td>
                  <td>{HtmlParser(prop.description)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
  return null;
};

Props.propTypes = {
  componentName: PropTypes.string,
  customMapper: PropTypes.func,
};
export default Props;
