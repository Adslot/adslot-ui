import React from 'react';
import Example from '../components/Example';
import { OverlayLoader, Button } from '../../src';

class OverlayLoaderExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDisabledLoader: false,
      showLoader: false,
    };
    this.toggleLoader = this.toggleLoader.bind(this);
    this.toggleDisabledLoader = this.toggleDisabledLoader.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.keyCode === 27) {
      this.toggleDisabledLoader();
    }
  }

  toggleLoader() {
    this.setState(prevState => ({ showLoader: !prevState.showLoader }));
  }

  toggleDisabledLoader() {
    this.setState(
      prevState => ({ showDisabledLoader: !prevState.showDisabledLoader, showLoader: false }),
      () => {
        const eventTrigger = this.state.showDisabledLoader ? window.addEventListener : window.removeEventListener;
        eventTrigger('keydown', this.handleKeyPress);
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <h4>Static markup</h4>
        <div className="static-markup">
          <OverlayLoader text="campaigns" />
          <OverlayLoader heading="Fetching" text="delivery data" />
        </div>
        <div className="live-demo">
          <h4>Demo</h4>
          <Button onClick={this.toggleLoader}>{this.state.showLoader ? 'Hide' : 'Show'} Loader</Button>
          {this.state.showLoader && <OverlayLoader heading="Entering" text="galaxy" />}
          <Button onClick={this.toggleDisabledLoader}>
            {this.state.showDisabledLoader ? 'Hide' : 'Show'} Loader (disabled background)
          </Button>
          {this.state.showDisabledLoader && <OverlayLoader disableBackground={true} text="Press esc to hide" />}
        </div>
      </React.Fragment>
    );
  }
}

const exampleProps = {
  componentName: 'Overlay Loader',
  notes: `Fixed position loader which provides user experience for page loading or interim loading states`,
  exampleCodeSnippet: `
    // Static Markup Loaders
    <OverlayLoader text="campaigns" />
    <OverlayLoader heading="Fetching" text="delivery data" />

    // Demo Loaders
    <OverlayLoader heading="Entering" text="galaxy" />
    <OverlayLoader disableBackground={true} text="Press esc to hide" />
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          defaultValue: 'Loading',
          propType: 'heading',
          type: 'string',
        },
        {
          propType: 'top',
          type: 'number',
          note: 'Position from top of DOM',
          defaultValue: '320',
        },
        {
          propType: 'text',
          type: 'string',
        },
        {
          propType: 'disableBackground',
          defaultValue: 'false',
          type: 'bool',
          note: 'prevents event propogation',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <OverlayLoaderExample />
  </Example>
);
