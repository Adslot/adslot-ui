import _ from 'lodash';
import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import PropTypes from 'prop-types';
import theme from './theme';
import PropTypeTable from '../PropTypeTable';
import * as AdslotUI from '../../../src';
import './styles.scss';

const Example = ({ children, componentName, notes, propTypeSectionArray, designNotes }) => (
  <div
    className={`adslot-ui-example-container ${_.kebabCase(componentName)}-example`}
    id={`${_.kebabCase(componentName)}-example`}
  >
    <h2>{componentName}</h2>

    <h3>Example</h3>
    <div className="adslot-ui-example">
      <LiveProvider
        code={children}
        scope={{ ...AdslotUI, useState }}
        theme={theme}
        transformCode={code => {
          console.log(code);
        }}
      >
        <LivePreview className="live-editor" />
        <LiveEditor />
        <LiveError />
      </LiveProvider>
    </div>

    {designNotes ? (
      <AdslotUI.InformationBox title="Design notes" className="note-panel">
        {designNotes}
      </AdslotUI.InformationBox>
    ) : null}
    {notes ? (
      <AdslotUI.InformationBox title="Technical notes" className="note-panel">
        {notes}
      </AdslotUI.InformationBox>
    ) : null}

    {_.map(propTypeSectionArray, (section, index) => (
      <PropTypeTable propTypes={section.propTypes} label={section.label} key={index} />
    ))}
    {_.isEmpty(propTypeSectionArray) ? <PropTypeTable /> : null}

    <AdslotUI.Button bsStyle="link" href="#top">
      ↑ Back to top.
    </AdslotUI.Button>
  </div>
);

Example.propTypes = {
  children: PropTypes.element.isRequired,
  componentName: PropTypes.string.isRequired,
  notes: PropTypes.node,
  designNotes: PropTypes.node,
  propTypeSectionArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Example;
