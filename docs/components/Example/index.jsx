import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { prism } from 'react-syntax-highlighter/prism';
import NotePanel from '../NotePanel';
import PropTypeTable from '../PropTypeTable';
import { Button } from '../../../src';

import './styles.scss';

class Example extends React.PureComponent {
  render() {
    const { children, componentName, notes, exampleCodeSnippet, propTypes, designNotes } = this.props;

    return (
      <div
        className={`adslot-ui-example-container ${_.kebabCase(componentName)}-example`}
        id={`${_.kebabCase(componentName)}-example`}
      >
        <h2>{componentName}</h2>

        {designNotes ? <NotePanel componentName={componentName} title="Design notes" notes={designNotes} /> : null}
        {notes ? <NotePanel componentName={componentName} title="Technical notes" notes={notes} /> : null}

        <h3>Example</h3>
        <div className="adslot-ui-example">{children}</div>

        <div className="adslot-ui-code-snippet">
          <SyntaxHighlighter language="jsx" style={prism}>
            {exampleCodeSnippet}
          </SyntaxHighlighter>
        </div>

        <PropTypeTable propTypes={propTypes} />

        <Button bsStyle="link" href="#top">
          ↑ Back to top.
        </Button>
      </div>
    );
  }
}

Example.propTypes = {
  children: PropTypes.element.isRequired,
  componentName: PropTypes.string.isRequired,
  notes: PropTypes.node,
  designNotes: PropTypes.node,
  exampleCodeSnippet: PropTypes.string.isRequired,
  propTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Example;
