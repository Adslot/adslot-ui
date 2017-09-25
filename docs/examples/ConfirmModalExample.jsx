import React from 'react';
import Example from '../components/Example';
import {
  Button,
  ConfirmModal,
} from '../../src/dist-entry';


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
        <Button bsStyle="primary" onClick={this.toggleConfirmModal}>Sign Off</Button>
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
      propType: 'modalApply',
      type: 'func',
    },
    {
      propType: 'modalClose',
      type: 'func',
    },
    {
      propType: 'show',
      type: 'boolean',
    },
  ],
};


export default () => <Example {...exampleProps}><ConfirmModalExample /></Example>;
