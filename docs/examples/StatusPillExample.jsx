import React from 'react';
import Example from '../components/Example';
import { StatusPill } from '../../src';

class StatusPillExample extends React.PureComponent {
  render() {
    return (
      <>
        <label>Status pills</label>
        <div>
          <StatusPill status="Primary" />
          <StatusPill status="Success" displayStyle="success" />
          <StatusPill status="Warning" displayStyle="warning" />
          <StatusPill status="Error" displayStyle="error" />
          <StatusPill status="Light" displayStyle="light" />
        </div>
        <br />
        <label>Inverse status pills</label>
        <div>
          <StatusPill status="Primary" inverse />
          <StatusPill status="Success" displayStyle="success" inverse />
          <StatusPill status="Warning" displayStyle="warning" inverse />
          <StatusPill status="Error" displayStyle="error" inverse />
          <StatusPill status="Light" displayStyle="light" inverse />
        </div>
      </>
    );
  }
}

const exampleProps = {
  componentName: 'Status Pill',
  notes: '',
  exampleCodeSnippet: `
  <label>Status pills</label>
  <StatusPill status='Primary' />
  <StatusPill status='Success' displayStyle='success' />
  <StatusPill status='Warning' displayStyle='warning' />
  <StatusPill status='Error' displayStyle='error' />
  <StatusPill status='Light' displayStyle='light' />


  <label>Inverse status pills</label>
  <StatusPill status='Primary' inverse />
  <StatusPill status='Success' displayStyle='success' inverse />
  <StatusPill status='Warning' displayStyle='warning' inverse />
  <StatusPill status='Error' displayStyle='error' inverse />
  <StatusPill status='Light' displayStyle='light' inverse />
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'status',
          type: 'string',
          note: 'Text inside status pill',
        },
        {
          propType: 'displayStyle',
          type: 'string',
          note: 'one of ["primary", "success", "warning", "error", "light"]',
          defaultValue: 'primary',
        },
        {
          propType: 'inverse',
          type: 'boolean',
          note: 'Status pill with inverse style',
          defaultValue: 'false',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'Generate "data-test-selector" on the status pill',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <StatusPillExample />
  </Example>
);
