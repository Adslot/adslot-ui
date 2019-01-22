import React from 'react';
import Example from '../components/Example';
import { Popover } from '../../src';

class PopoverExample extends React.PureComponent {
  render() {
    return (
      <>
        <label>Placement (left, right, bottom, top)</label>
        <div style={{ display: 'flex' }}>
          <Popover id="popover-example-left" placement="left" title="Popover Title">
            LEFT
          </Popover>
          <Popover id="popover-example-right" placement="right" title="Popover Title">
            RIGHT
          </Popover>
          <Popover id="popover-example-bottom" placement="bottom" title="Popover Title">
            BOTTOM
          </Popover>
          <Popover id="popover-example-top" placement="top" title="Popover Title">
            TOP
          </Popover>
        </div>
        <label>Theme (light, dark, warn, error)</label>
        <div style={{ display: 'flex' }}>
          <Popover id="popover-example-light" placement="bottom" theme="light" title="Popover Title">
            LIGHT
          </Popover>
          <Popover id="popover-example-dark" placement="bottom" theme="dark" title="Popover Title">
            DARK
          </Popover>
          <Popover id="popover-example-warn" placement="bottom" theme="warn" title="Popover Title">
            WARN
          </Popover>
          <Popover id="popover-example-error" placement="bottom" theme="error" title="Popover Title">
            ERROR
          </Popover>
        </div>
      </>
    );
  }
}

const exampleProps = {
  componentName: 'Popover',
  exampleCodeSnippet: `
    <Popover id="popover-example-left" placement="left" title="Popover Title">
      LEFT
    </Popover>

    <Popover id="popover-example-right" placement="right" title="Popover Title">
      RIGHT
    </Popover>

    <Popover id="popover-example-bottom" placement="bottom" title="Popover Title">
      BOTTOM
    </Popover>

    <Popover id="popover-example-top" placement="top" title="Popover Title">
      TOP
    </Popover>

    <Popover id="popover-example-light" placement="bottom" theme="light" title="Popover Title">
      LIGHT
    </Popover>

    <Popover id="popover-example-dark" placement="bottom" theme="dark" title="Popover Title">
      DARK
    </Popover>

    <Popover id="popover-example-warn" placement="bottom" theme="warn" title="Popover Title">
      WARN
    </Popover>

    <Popover id="popover-example-error" placement="bottom" theme="error" title="Popover Title">
      ERROR
    </Popover>
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'id',
          type: 'string',
          note: 'A unique identifier for the element.',
        },
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
          propType: 'bsClass',
          type: 'text',
          defaultValue: 'popover',
          note: `Base className. The default value is 'popover'.`,
        },
        {
          propType: 'className',
          type: 'text',
          note: 'Additional className for the component',
        },
        {
          propType: 'placement',
          type: 'oneOf[top, right, bottom, left]',
          defaultValue: 'right',
        },
        {
          propType: 'theme',
          type: 'oneOf[light, dark, warn, error]',
          defaultValue: 'light',
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
