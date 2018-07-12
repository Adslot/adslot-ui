import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import coy from 'react-syntax-highlighter/styles/prism/coy';

import PropTypeTable from '../PropTypeTable';
import { Button, InformationBox } from '../../../src';

import './styles.scss';

registerLanguage('jsx', jsx);

class Example extends React.PureComponent {
  render() {
    const { children, componentName, notes, exampleCodeSnippet, propTypeSectionArray, designNotes, props } = this.props;

    return (
      <div
        className={`adslot-ui-example-container ${_.kebabCase(componentName)}-example`}
        id={`${_.kebabCase(componentName)}-example`}
      >
        <h2>{componentName}</h2>

        <h3>Example</h3>
        <div className="adslot-ui-example">{children}</div>

        <div className="adslot-ui-code-snippet">
          <SyntaxHighlighter language="jsx" style={coy}>
            {exampleCodeSnippet}
          </SyntaxHighlighter>
        </div>

        {designNotes ? (
          <InformationBox title="Design notes" className="note-panel">
            {designNotes}
          </InformationBox>
        ) : null}
        {notes ? (
          <InformationBox title="Technical notes" className="note-panel">
            {notes}
          </InformationBox>
        ) : null}

        {_.map(propTypeSectionArray, (section, index) => (
          <PropTypeTable propTypes={section.propTypes} label={section.label} key={index} />
        ))}
        {_.isEmpty(propTypeSectionArray) ? <PropTypeTable /> : null}
        {!_.isEmpty(props) ? <PropTypeTable props={props} /> : null}

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
  propTypeSectionArray: PropTypes.arrayOf(PropTypes.object),
  props: PropTypes.object, // eslint-disable-line
};

export default Example;
