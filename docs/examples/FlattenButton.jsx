import React from 'react';
import Example from '../components/Example';
import { FlattenButton } from '../../src';

class ButtonExample extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };

    this.setToLoading = this.setToLoading.bind(this);
  }

  setToLoading() {
    console.log('Clicked');
    this.setState({ isLoading: true }, () => setTimeout(() => this.setState({ isLoading: false }), 5000));
  }

  render() {
    const loadingButtonProps = {
      onClick: this.setToLoading,
      isLoading: this.state.isLoading,
    };

    return (
      <div>
        <br />
        <p>
          <b>Medium Size</b> height: 30px, min-width: 102px
        </p>
        <div>
          <FlattenButton>Default</FlattenButton>
          <FlattenButton style="primary">Primary</FlattenButton>
          <FlattenButton style="alert">Alert</FlattenButton>
          <FlattenButton style="success">Success</FlattenButton>
          <FlattenButton disabled>Disabled</FlattenButton>
        </div>
        <br />
        <p>
          <b>Inverse Versions</b>
        </p>
        <div>
          <FlattenButton inverse>Default</FlattenButton>
          <FlattenButton style="primary" inverse>
            Primary
          </FlattenButton>
          <FlattenButton style="alert" inverse>
            Alert
          </FlattenButton>
          <FlattenButton style="success" inverse>
            Success
          </FlattenButton>
          <FlattenButton disabled inverse>
            Disabled
          </FlattenButton>
        </div>
        <br />
        <p>
          <b>With Loading</b>
        </p>
        <div>
          <FlattenButton {...loadingButtonProps}>Click to load</FlattenButton>
          <FlattenButton style="primary" {...loadingButtonProps}>
            Click to load
          </FlattenButton>
          <FlattenButton style="alert" {...loadingButtonProps}>
            Click to load
          </FlattenButton>
          <FlattenButton style="success" {...loadingButtonProps}>
            Click to load
          </FlattenButton>
        </div>
        <br />
        <div>
          <FlattenButton small {...loadingButtonProps}>Click to load</FlattenButton>
          <FlattenButton small style="primary" {...loadingButtonProps}>
            Click to load
          </FlattenButton>
          <FlattenButton small style="alert" {...loadingButtonProps}>
            Click to load
          </FlattenButton>
          <FlattenButton small style="success" {...loadingButtonProps}>
            Click to load
          </FlattenButton>
        </div>
        <br />
        <p>
          <b>Small Size</b> height: 24px, min-width: 72px
        </p>
        <div>
          <FlattenButton small>Default</FlattenButton>
          <FlattenButton style="primary" small>
            Primary
          </FlattenButton>
          <FlattenButton style="alert" small>
            Alert
          </FlattenButton>
          <FlattenButton style="success" small>
            Success
          </FlattenButton>
          <FlattenButton disabled small>
            Disabled
          </FlattenButton>
        </div>
      </div>
    );
  }
}

export const exampleProps = {
  componentName: 'Flatten Button',
  exampleCodeSnippet: '',
  propTypeSectionArray: [],
};

export default () => (
  <Example {...exampleProps}>
    <ButtonExample />
  </Example>
);
