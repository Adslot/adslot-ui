import React from 'react';
import Example from '../components/Example';
import { Button, ActionPanel } from '../../src';

class ActionPanelExample extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showActionPanel: false,
    };
    this.toggleActionPanel = this.toggleActionPanel.bind(this);
  }

  toggleActionPanel() {
    this.setState({ showActionPanel: !this.state.showActionPanel });
  }

  render() {
    return (
      <React.Fragment>
        <h4>Static markup</h4>
        <div>
          <ActionPanel
            title="Action panel: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            size="small"
            onClose={this.toggleActionPanel}
            children={
              <span>
                Australia hosts a rich biodiversity. Compared to other regions of the world, it has a unique wildlife.
                Endemic animals roam freely in the wild. Some of them are Australia's cultural icons such as the
                kangaroos, koalas, and emus.
              </span>
            }
          />
        </div>
        <div className="live-demo">
          <h4>Demo</h4>
          <Button onClick={this.toggleActionPanel}>Action Panel as a modal</Button>
          {this.state.showActionPanel && (
            <ActionPanel
              title="Action Panel"
              size="large"
              onClose={this.toggleActionPanel}
              actionButton={<Button>Action</Button>}
              isModal
              children={
                <span>
                  Native mammals include the dingoes or wild dogs, numbats, quolls, and Tasmanian devils. Dingoes are
                  the largest carnivorous mammals that populate the wilds of mainland Australia. But the smaller numbats
                  and Tasmanian devils, which are house cat-like size can be seen only in wildlife parks. You can also
                  spot them in the wilds of Tasmania.
                </span>
              }
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const exampleProps = {
  componentName: 'Action Panel',
  designNotes: <p>Action panel can be used as a modal or a information display panel.</p>,
  exampleCodeSnippet: `
    <ActionPanel
      title="This is an action panel"
      size="small"
      onClose={this.toggleActionPanel}
    />`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'title',
          type: 'string',
        },
        {
          propType: 'className',
          type: 'string',
        },
        {
          propType: 'size',
          type: "oneOf: 'small', 'medium', 'large'",
          defaultValue: 'large',
          note: 'small - 500px, medium - 700px,  large- 1000px',
        },
        {
          propType: 'onClose',
          type: 'func',
        },
        {
          propType: 'children',
          type: 'node',
        },
        {
          propType: 'actionButton',
          type: 'node',
          defaultValue: 'null',
        },
        {
          propType: 'isModal',
          type: 'bool',
          defaultValue: 'false',
        },
        {
          propType: 'closeIcon',
          type: 'node',
          defaultValue: (
            <pre>
              <div className="close-icon" />
            </pre>
          ),
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <ActionPanelExample />
  </Example>
);
