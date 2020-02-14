import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import CodeBlock from '../../containers/CodeBlock';
import PropTypeTable from '../PropTypeTable';
import { Button, InformationBox } from '../../../src';

import './styles.scss';

class Example extends React.PureComponent {
  render() {
    const { children, componentName, notes, propTypeSectionArray, designNotes } = this.props;

    return (
      <div
        className={`adslot-ui-example-container ${_.kebabCase(componentName)}-example`}
        id={`${_.kebabCase(componentName)}-example`}
      >
        <h2>{componentName}</h2>

        <h3>Example</h3>
        <div className="adslot-ui-example">
          <CodeBlock live>{children}</CodeBlock>
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
  propTypeSectionArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Example;
