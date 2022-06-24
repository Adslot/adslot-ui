import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypeTable from './components/PropTypeTable';
import { InformationBox } from '../../src';
import './styles.css';
import CodeBlock from './CodeBlock';

class Documentation extends React.PureComponent {
  render() {
    const { componentName, notes, propTypeSectionArray, designNotes, children } = this.props;

    return (
      <div
        className={`adslot-ui-example-container ${_.kebabCase(componentName)}-example`}
        id={`${_.kebabCase(componentName)}-example`}
      >
        <h2>{componentName}</h2>

        <CodeBlock live>{children}</CodeBlock>

        {designNotes ? (
          <InformationBox title="Design notes" className="aui--docs-note-panel">
            {designNotes}
          </InformationBox>
        ) : null}
        {notes ? (
          <InformationBox title="Technical notes" className="aui--docs-note-panel">
            {notes}
          </InformationBox>
        ) : null}

        {_.map(propTypeSectionArray, (section, index) => (
          // eslint-disable-next-line
          <PropTypeTable propTypes={section.propTypes} label={section.label} key={index} />
        ))}
        {_.isEmpty(propTypeSectionArray) ? <PropTypeTable /> : null}
      </div>
    );
  }
}

Documentation.propTypes = {
  componentName: PropTypes.string.isRequired,
  notes: PropTypes.node,
  designNotes: PropTypes.node,
  children: PropTypes.node,
  propTypeSectionArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Documentation;
