import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import HtmlParser from 'react-html-parser';
import props from './props.json';

const Props = ({ componentName, customMapper }) => {
  const componentExports = customMapper
    ? customMapper(props)
    : props[`src/components/${componentName}/index.jsx`] || [];

  const componentProps =
    componentExports.length === 1
      ? componentExports[0]
      : componentExports.find((component) => component.displayName === componentName);

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
                    <code>{_.get(prop, 'defaultValue.value', '')}</code>
                  </td>
                  <td>{HtmlParser(prop.description)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {componentProps.methods && componentProps.methods.length > 0 && (
          <>
            <h3>Methods</h3>
            {_.map(componentProps.methods, (method) => {
              return (
                <div key={method.name} className="aui--docs-method-block">
                  <section className="aui--docs-method-details">
                    <h4>
                      <code>
                        <strong>{HtmlParser(_.get(method, 'name'), '')}</strong> (
                        {method.params.map((param, i) => (
                          <span key={param.name}>
                            {param.name}
                            {param.optional && '?'}
                            {param.type?.name && `: ${HtmlParser(_.get(param, 'type.name'), '')}}`}
                            {i !== method.params.length - 1 && ', '}
                          </span>
                        ))}
                        ){method.returns?.type && ` => ${HtmlParser(_.get(method, 'returns.type.name'), '')}`}
                      </code>
                    </h4>
                    {method.description && (
                      <p>
                        <strong>Description </strong>
                        {HtmlParser(method.description)}
                      </p>
                    )}
                    {method.returns && (
                      <p>
                        <strong>Returns </strong>
                        <code>{HtmlParser(_.get(method, 'returns.type.name'), '')}</code>
                        {_.get(method, 'returns.description') &&
                          ` - ${HtmlParser(_.get(method, 'returns.description'), '')}`}
                      </p>
                    )}
                  </section>
                  {method.params && method.params.length > 0 && (
                    <>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Param</th>
                            <th>Required</th>
                            <th>Type</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {_.map(method.params, (param) => (
                            <tr key={param.name}>
                              <td>
                                <code>{HtmlParser(_.get(param, 'name'), '')}</code>
                              </td>
                              <td>
                                <code>{!param.optional && 'true'}</code>
                              </td>
                              <td>{param.type && <code>{HtmlParser(_.get(param, 'type.name'), '')}</code>}</td>
                              <td>{param.description && HtmlParser(_.get(param, 'description'), '')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}
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
