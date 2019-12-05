import React from 'react';
import Example from '../components/Example';
import { Button, Popover, RadioGroup, Radio } from '../../src';
import { popoverPlacements } from '../../src/components/third-party/Popover/constants';

class PopoverWithRefExample extends React.PureComponent {
  state = {
    isOpen: false,
    placement: 'left',
  };

  myRef = React.createRef();

  handlePlacement = placement => this.setState({ placement });

  togglePopover = () =>
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));

  render() {
    return (
      <React.Fragment>
        <label>Placements</label>
        <RadioGroup inline name="placement" value={this.state.placement} onChange={this.handlePlacement}>
          {popoverPlacements.map(placement => (
            <Radio key={placement} value={placement} label={placement} />
          ))}
        </RadioGroup>

        <Button onClick={this.togglePopover}>Toggle Popover</Button>
        <div className="external-anchor" ref={this.myRef}>
          Anchor
        </div>
        {this.state.isOpen && (
          <Popover.WithRef
            refElement={this.myRef.current}
            placement={this.state.placement}
            title="Popover title"
            theme="dark"
            popoverContent="My initial positioning is left"
            isOpen={this.state.isOpen}
          />
        )}
      </React.Fragment>
    );
  }
}

const exampleProps = {
  componentName: 'Popover With Ref',
  exampleCodeSnippet: `
    <Button onClick={this.togglePopover}>Toggle Popover</Button>
    <div ref={this.myRef}>Anchor</div>
    {
      this.state.isOpen &&
      <Popover.WithRef
        refElement={this.myRef.current}
        placement="left"
        title="Popover Title"
        theme="dark"
        popoverContent="My initial positioning is left"
        isOpen={this.state.isOpen}
      />
    }   
  `,
  notes: 'Popover.WithRef is used to created a popover and position it based on the refElement you provided.',
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'title',
          type: 'node',
          note: 'Title for this popover.',
        },
        {
          propType: 'refElement',
          type: 'HTMLElement',
          note: 'Required. It must be an object with an interface compatible with an HTMLElement',
        },
        {
          propType: 'popoverClassNames',
          type: 'text',
          note: 'Additional className for the popover',
        },
        {
          propType: 'placement',
          type: 'oneOf[left, top, top-start, top-end, bottom-start, bottom, bottom-end, right, auto]',
          defaultValue: 'auto',
        },
        {
          propType: 'getContainer',
          type: 'func',
          note:
            'A function that will return an element as the container for Popover to perform flipping on boundaries.',
        },
        {
          propType: 'arrowStyles',
          type: 'object',
          note: 'Custom styles for arrows',
        },
        {
          propType: 'wrapperStyles',
          type: 'object',
          note: 'Custom styles for popover',
        },
        {
          propType: 'theme',
          type: 'oneOf[light, dark, warn, error]',
          defaultValue: 'light',
        },
        {
          propType: 'popoverContent',
          type: 'node',
          note: 'Required',
        },
        {
          propType: 'modifiers',
          type: 'PopperJS.Modifiers',
          note: <a href="https://popper.js.org/popper-documentation.html#modifiers">Popper Modifier Configurations</a>,
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'Render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'isOpen',
          type: 'boolean',
          note: 'Decide whether to render the popover',
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
    <PopoverWithRefExample />
  </Example>
);
