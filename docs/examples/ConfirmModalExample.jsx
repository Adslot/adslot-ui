import React from 'react';
import Example from '../components/Example';
import { Button, ConfirmModal } from '../../src/dist-entry';

class ConfirmModalExample extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showConfirmModal: false,
    };
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
  }

  toggleConfirmModal() {
    this.setState({ showConfirmModal: !this.state.showConfirmModal });
  }

  render() {
    return (
      <div>
        <ConfirmModal
          modalApply={this.toggleConfirmModal}
          modalClose={this.toggleConfirmModal}
          show={this.state.showConfirmModal}
        />
        <Button bsStyle="primary" onClick={this.toggleConfirmModal}>
          Sign Off
        </Button>
      </div>
    );
  }
}

const exampleProps = {
  componentName: 'Confirm Modal',
  exampleCodeSnippet: `<ConfirmModal
  modalApply={this.toggleConfirmModal}
  modalClose={this.toggleConfirmModal}
  show={this.state.showConfirmModal}
/>`,
  propTypes: [
    {
      propType: 'buttonCancelLabel',
      type: 'string',
      defaultValue: 'Cancel',
    },
    {
      propType: 'buttonConfirmLabel',
      type: 'string',
      defaultValue: 'Confirm',
    },
    {
      propType: 'modalApply',
      type: 'func',
      defaultValue: "() => { throw new Error('AdslotUi ConfirmModal needs a modalApply handler'); }",
    },
    {
      propType: 'modalClose',
      type: 'func',
    },
    {
      propType: 'modalDescription',
      type: 'string',
      defaultValue: 'Are you sure?',
    },
    {
      propType: 'modalTitle',
      type: 'string',
    },
    {
      propType: 'show',
      type: 'boolean',
      defaultValue: 'true',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <ConfirmModalExample />
  </Example>
);
