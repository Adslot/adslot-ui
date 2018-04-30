import React from 'react';
import Example from '../components/Example';
import { Button } from '../../src';

class ButtonExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      canUndo: false,
    };
    this.onClick = () => this.setState({ canUndo: !this.state.canUndo });
  }

  render() {
    return (
      <div>
        <Button bsStyle="link" disabled={!this.state.canUndo} reason="There's nothing to undo." onClick={this.onClick}>
          Undo
        </Button>
        <Button bsStyle="primary" disabled={this.state.canUndo} onClick={this.onClick}>
          Apply
        </Button>
      </div>
    );
  }
}

export const exampleProps = {
  componentName: 'Button',
  notes: (
    <p>
      See{' '}
      <a href="https://getbootstrap.com/docs/3.3/css/#buttons" target="_blank" rel="noopener noreferrer">
        Bootstrap documentation
      </a>{' '}
      or{' '}
      <a href="https://react-bootstrap.github.io/components/buttons/" target="_blank" rel="noopener noreferrer">
        React Bootstrap documentation
      </a>.
    </p>
  ),
  designNotes: (
    <p>
      <span className="text-bold">Primary buttons</span> are used to drive user action, there is only one primary action
      button per page. Primary buttons display filled with a colour and inverted white text eg.{' '}
      <span className="text-blue text-bold">Blue</span>, <span className="text-green text-bold">Green</span> and used
      commonly for Sign off, Save, Apply, Approve etc.
      <br />
      <br />
      <span className="text-bold">Inverted button</span> is used as a secondary action to the primary action on the
      page. Inverted buttons are bordered with <span className="text-gray-light text-bold">Gray-Light</span> with text{' '}
      <span className="text-gray-dark text-bold">Gray-Dark</span> and used commonly for eg. Edit, Cancel, Add Product,
      Close etc.
      <br />
      <br />
      <span className="text-bold">Inverted coloured buttons</span> are used as second primary actions alongside a
      primary action. Use the same colour for the border and text eg. <span className="text-blue text-bold">Blue</span>,{' '}
      <span className="text-green text-bold">Green</span>, <span className="text-red text-bold">Red</span> eg. Cancel
      Campaign, Save, Reject etc.
    </p>
  ),
  exampleCodeSnippet: `<div>
  <Button
    bsStyle="link"
    disabled={!this.state.canUndo}
    reason="There's nothing to undo."
    onClick={this.onClick}
  >
    Undo
  </Button>
  <Button
    bsStyle="primary"
    disabled={this.state.canUndo}
    onClick={this.onClick}
  >
    Apply
  </Button>
</div>`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'bsStyle',
          type: 'string, oneOf primary, link, and default.',
          defaultValue: 'default',
          note: (
            <span>
              <br />It&apos;s uncommon to use <code>success</code>, <code>info</code>, <code>warning</code>, or{' '}
              <code>danger</code>
              which are supported by Bootstrap but not us.
            </span>
          ),
        },
        {
          propType: 'inverse',
          type: 'bool',
          note: 'Renders an inverse button. Can be used with bsStyle to create primary inverse buttons.',
          defaultValue: 'false',
        },
        {
          propType: 'reason',
          type: 'string',
          note: 'Used in tandem with the disabled prop to present a popover explaining why the button is disabled.',
        },
        {
          propType: 'onClick',
          type: 'func',
          note: 'onClick(event)',
        },
        {
          propType: 'bsSize',
          type: 'string',
          note: (
            <span>
              We rarely use <code>large</code>, and should not use <code>small</code>.
            </span>
          ),
        },
        {
          propType: 'isLoading',
          type: 'bool',
          defaultValue: 'false',
          note: 'set this to true to display Spinner and disable the button',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <ButtonExample />
  </Example>
);
