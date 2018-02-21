import React from 'react';
import Example from '../components/Example';
import { ProgressBar } from '../../src';

class ProgressBarExample extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ProgressBar striped bsStyle="success" now={40} />
        <ProgressBar striped bsStyle="info" now={20} />
        <ProgressBar striped bsStyle="warning" now={60} />
        <ProgressBar striped bsStyle="danger" now={80} />
      </React.Fragment>
    );
  }
}

export const exampleProps = {
  componentName: 'Progress Bar',
  notes: (
    <p>
      See{' '}
      <a href="https://react-bootstrap-v3.netlify.com/components/progress/" target="_blank" rel="noopener noreferrer">
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
    <ProgressBarExample />
  </Example>
);
