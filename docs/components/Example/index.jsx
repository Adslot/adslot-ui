import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import {
  Button,
  Empty,
} from '../../../src/dist-entry';

import './styles.scss';


class Example extends React.PureComponent {
  render() {
    const {
      children,
      componentName,
      notes,
      exampleCodeSnippet,
      propTypes,
    } = this.props;

    return (
      <div className="adslot-ui-example-container" id={`${_.kebabCase(componentName)}-example`}>

        <h2>{componentName}</h2>

        {notes ? <div>{notes}</div> : null}

        <h3>Example</h3>
        <div className="adslot-ui-example">
          {children}
        </div>

        <div className="adslot-ui-code-snippet">
          <SyntaxHighlighter language="html" style={github}>{exampleCodeSnippet}</SyntaxHighlighter>
        </div>

        <h3>PropTypes</h3>
        <div className="adslot-ui-proptype-table">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>PropType</th>
                <th>Type</th>
                <th>Default Value</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {_.map(propTypes, ({ propType, type, defaultValue, note }) => (
                <tr key={propType}>
                  <td><pre>{propType}</pre></td>
                  <td><pre>{type}</pre></td>
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
        <Button bsStyle="link" href="#top">↑ Back to top.</Button>
      </div>
    );
  }
}

Example.propTypes = ({
  children: PropTypes.element.isRequired,
  componentName: PropTypes.string.isRequired,
  notes: PropTypes.node,
  exampleCodeSnippet: PropTypes.string.isRequired,
  propTypes: PropTypes.arrayOf(PropTypes.shape({
    propType: PropTypes.string.isRequired,
    type: PropTypes.node.isRequired,
    defaultValue: PropTypes.node,
    note: PropTypes.node,
  })).isRequired,
});

export default Example;
