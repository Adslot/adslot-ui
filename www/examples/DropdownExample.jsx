import React from 'react';
import Example from '../components/Example';
import { Dropdown, MenuItem } from '../../src';

class DropdownExample extends React.PureComponent {
  render() {
    return (
      <Dropdown id="dropdown-custom-1">
        <Dropdown.Toggle>Open Dropdown</Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          <MenuItem eventKey="1">Action</MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
          <MenuItem eventKey="3" active>
            Active Item
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4">Separated link</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export const exampleProps = {
  componentName: 'Dropdown',
  notes: (
    <p>
      See{' '}
      <a href="https://react-bootstrap-v3.netlify.com/components/dropdowns/" target="_blank" rel="noopener noreferrer">
        React Bootstrap documentation
      </a>{' '}
    </p>
  ),
  designNotes: '',
  exampleCodeSnippet: '',
  propTypeSectionArray: [],
};

export default () => (
  <Example {...exampleProps}>
    <DropdownExample />
  </Example>
);
