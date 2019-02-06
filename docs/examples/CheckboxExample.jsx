import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { Checkbox } from '../../src';

const handleChange = (...arg) => console.log('Checkbox changed with arguments', ...arg);

const CheckboxExample = () => (
  <>
    <h4>Not selected</h4>
    <Checkbox label="Checked: false" checked={false} inline className="fix-size" onChange={handleChange} />
    <Checkbox
      label={
        <p>
          Checked: false <br /> <b>Disabled</b>
        </p>
      }
      checked={false}
      disabled
      inline
      className="fix-size"
      onChange={handleChange}
    />
    <h4>Selected</h4>
    <Checkbox label="Checked: true" checked inline className="fix-size" onChange={handleChange} />
    <Checkbox
      label={
        <p>
          Checked: true <br /> <b>Disabled</b>
        </p>
      }
      checked
      disabled
      inline
      className="fix-size"
      onChange={handleChange}
    />
    <h4>Partial Selected</h4>
    <Checkbox label={`Checked: 'partial'`} checked="partial" inline className="fix-size" onChange={handleChange} />
    <Checkbox
      label={
        <p>
          Checked: 'partial' <br /> <b>Disabled</b>
        </p>
      }
      checked="partial"
      disabled
      inline
      className="fix-size"
      onChange={handleChange}
    />
    <h4>Checkboxes without labels</h4>
    <Checkbox checked={false} inline onChange={handleChange} />
    <Checkbox checked={false} disabled inline onChange={handleChange} />
    <Checkbox checked inline onChange={handleChange} />
    <Checkbox checked disabled inline onChange={handleChange} />
    <Checkbox checked="partial" inline onChange={handleChange} />
    <Checkbox checked="partial" disabled inline onChange={handleChange} />
  </>
);

const exampleProps = {
  componentName: 'Checkbox',
  notes: '',
  exampleCodeSnippet: `
  <h4>Not selected</h4>
  <Checkbox label="Checked: false" checked={false} inline />
  <Checkbox
    label={
      <p>
        Checked: false <br /> <b>Disabled</b>
      </p>
    }
    checked={false}
    disabled
    inline
  />
  <h4>Selected</h4>
  <Checkbox label="Checked: true" checked inline />
  <Checkbox
    label={
      <p>
        Checked: true <br /> <b>Disabled</b>
      </p>
    }
    checked
    disabled
    inline
  />
  <h4>Partial Selected</h4>
  <Checkbox label={\`Checked: 'partial'\`} checked="partial" inline />
  <Checkbox
    label={
      <p>
        Checked: 'partial' <br /> <b>Disabled</b>
      </p>
    }
    checked="partial"
    disabled
    inline
  />
  <h4>Checkboxes without labels</h4>
  <Checkbox checked={false} inline />
  <Checkbox checked={false} disabled inline />
  <Checkbox checked inline />
  <Checkbox checked disabled inline />
  <Checkbox checked="partial" inline />
  <Checkbox checked="partial" disabled inline />
  `,
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
        {
          propType: 'id',
          type: 'string',
        },
        {
          propType: 'className',
          type: 'string',
          note: 'This class will be applied to the input element',
        },
        {
          propType: 'name',
          type: 'string',
        },
        {
          propType: 'label',
          type: 'node',
        },
        {
          propType: 'value',
          type: 'string',
        },
        {
          propType: 'checked',
          type: 'bool',
          defaultValue: <code>false</code>,
        },
        {
          propType: 'disabled',
          type: 'bool',
          defaultValue: <code>false</code>,
        },
        {
          propType: 'dts',
          type: 'string',
        },
        {
          propType: 'onChange',
          type: 'func',
        },
        {
          propType: 'inline',
          type: 'bool',
          note: 'Set this component to be `display: inline-block`.',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <CheckboxExample />
  </Example>
);
