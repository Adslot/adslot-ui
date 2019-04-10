import React from 'react';
import Example from '../components/Example';
import { Button, Popover } from '../../src';

class PopoverExample extends React.PureComponent {
  renderPopoverContent = content => (
    <div>
      <p>static content</p>
      <span>{content}</span>
    </div>
  );

  render() {
    return (
      <>
        <label>Placement (left(-start, -end), top(-start, -end), bottom(-start, -end), right(-start, -end))</label>
        <div style={{ display: 'flex' }}>
          <Popover placement="left" title="Popover Title" popoverContent="Popover Left">
            <Button>Left</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="top" title="Popover Title" popoverContent="Popover Top">
            <Button>Top</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="bottom-start" title="Popover Title" popoverContent="Popover Bottom Start">
            <Button>Bottom-Start</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="bottom" title="Popover Title" popoverContent="Popover Bottom">
            <Button>Bottom</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover
            arrowStyles={{ left: 'auto', right: 30 }}
            placement="bottom-end"
            title="Popover Title"
            popoverContent="Popover Bottom End with custom arrow position"
          >
            <Button>Bottom-End</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="right" title="Popover Title" popoverContent="Popover Right">
            <Button>Right</Button>
          </Popover>

          <div className="horizontal-separator" />
          <Popover placement="top-start" title="Popover Title" popoverContent="Popover Top Start">
            <Button>Top-Start</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="top-end" title="Popover Title" popoverContent="Popover Top End">
            <Button>Top-End</Button>
          </Popover>
        </div>
        <div className="vertical-separator" />
        <label>Theme (light, dark, warn, error)</label>
        <div style={{ display: 'flex' }}>
          <Popover placement="left" theme="light" title="Popover Title" popoverContent="Light theme">
            <Button>Light</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="top" theme="dark" title="Popover Title" popoverContent="Dark Theme">
            <Button>Dark</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="right" theme="warn" title="Popover Title" popoverContent="Warn Theme">
            <Button>Warn</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover placement="bottom" theme="error" title="Popover Title" popoverContent="Error Theme">
            <Button>Error</Button>
          </Popover>
        </div>
        <div className="vertical-separator" />
        <label>Trigger (click, hover)</label>
        <div style={{ display: 'flex' }}>
          <Popover
            triggers="click"
            placement="left"
            theme="light"
            title="Popover Title"
            popoverContent={this.renderPopoverContent('some dynamic content')}
          >
            <Button bsStyle="primary">Click Me</Button>
          </Popover>
          <div className="horizontal-separator" />
          <Popover
            triggers="hover"
            placement="right"
            theme="dark"
            title="Popover Title"
            popoverContent={this.renderPopoverContent('some other dynamic content')}
          >
            <Button bsStyle="primary">Hover Me</Button>
          </Popover>
        </div>
      </>
    );
  }
}

const exampleProps = {
  componentName: 'Popover',
  exampleCodeSnippet: `
    <Popover placement="left" title="Popover Title" popoverContent="Popover Left">
      <Button>Left</Button>
    </Popover>

    <Popover placement="top" title="Popover Title" popoverContent="Popover Top">
      <Button>Top</Button>
    </Popover>

    <Popover placement="bottom-start" title="Popover Title" popoverContent="Popover Bottom">
      <Button>Bottom-Start</Button>
    </Popover>

    <Popover placement="bottom" title="Popover Title" popoverContent="Popover Bottom">
      <Button>Bottom</Button>
    </Popover>

    <Popover
      arrowStyles={{ left: 'auto', right: 30 }}
      placement="bottom-end"
      title="Popover Title"
      popoverContent="Popover Bottom End with custom arrow position"
    >
      <Button>Bottom-End</Button>
    </Popover>

    <Popover placement="right" title="Popover Title" popoverContent="Popover Right">
      <Button>Right</Button>
    </Popover>
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'title',
          type: 'node',
          note: 'Title for this popover.',
        },
        {
          propType: 'children',
          type: 'node',
          note: 'Message content for this popover.',
        },
        {
          propType: 'className',
          type: 'text',
          note: 'Additional className for the popover content',
        },
        {
          propType: 'wrapperClassName',
          type: 'text',
          note: 'Additional className for the popover wrapper',
        },
        {
          propType: 'arrowStyles',
          type: 'object',
          note: 'CSS object to add additional styles to the arrow, mainly to customize the position the arrow',
        },
        {
          propType: 'placement',
          type: 'oneOf[top, right, bottom, left, auto]',
          defaultValue: 'auto',
        },
        {
          propType: 'theme',
          type: 'oneOf[light, dark, warn, error]',
          defaultValue: 'light',
        },
        {
          propType: 'popoverContent',
          type: 'node',
          note: 'Popover content, can be a react element.',
        },
        {
          propType: 'triggers',
          type: 'string|array',
          defaultValue: <pre>hover</pre>,
          note: (
            <span>
              can be an array of triggers, or a string. Accepted values are{' '}
              <pre>['click', 'hover', 'focus', 'disabled']</pre>
            </span>
          ),
        },
        {
          propType: 'boundToContainer',
          type: 'instanceof Element',
          defaultValue: <pre>document.body</pre>,
          note: 'Container for the popover to be mounted to',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'popperRef',
          type: 'func',
          note: (
            <div>
              <pre>(node) => this.ref = node;</pre>
              <br />
              <p>Store the ref of the popover to manipulate when needed.</p>
            </div>
          ),
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <PopoverExample />
  </Example>
);
