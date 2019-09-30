import React from 'react';
import Example from '../components/Example';
import _ from 'lodash';
import { Checkbox, Button, Popover } from '../../src';

class PopoverExample extends React.PureComponent {
  state = {
    placement: 'left',
    theme: 'light',
    trigger: 'hover',
    isOpen: false,
  };

  placements = ['left', 'top', 'top-start', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'right'];
  themes = ['light', 'dark', 'warn', 'error', 'info', 'success'];
  triggers = ['hover', 'click'];

  renderPopoverContent = content => (
    <div>
      <p>static content</p>
      <span>{content}</span>
    </div>
  );

  handlePlacements = (state, placement) => this.setState({ placement });
  handleThemes = (state, theme) => this.setState({ theme });
  handleTriggers = (state, trigger) => this.setState({ trigger });
  togglePopover = () =>
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));

  render() {
    const formattedPlacement = _.startCase(_.toLower(this.state.placement));
    const formattedTheme = _.startCase(_.toLower(this.state.theme));
    const formattedTrigger = _.startCase(_.toLower(this.state.trigger));
    return (
      <>
        <div className="button-example-container">
          <h3>Popover over element</h3>
          <label>Placements</label>
          <div className="placement-checkbox">
            {_.map(this.placements, (placement, index) => (
              <Checkbox
                key={index}
                onChange={this.handlePlacements}
                value={this.state.placement}
                name={placement}
                label={placement}
                checked={this.state.placement === placement}
              />
            ))}
          </div>
          <label>Themes</label>
          <div className="theme-checkbox">
            {_.map(this.themes, (theme, index) => (
              <Checkbox
                key={index}
                onChange={this.handleThemes}
                value={this.state.theme}
                name={theme}
                label={theme}
                checked={this.state.theme === theme}
              />
            ))}
          </div>
          <label>Triggers</label>
          <div className="trigger-checkbox">
            {_.map(this.triggers, (trigger, index) => (
              <Checkbox
                key={index}
                onChange={this.handleTriggers}
                value={this.state.trigger}
                name={trigger}
                label={trigger}
                checked={this.state.trigger === trigger}
              />
            ))}
          </div>
          <div className="disabled-popover">
            You can also&nbsp;
            <Checkbox
              onChange={this.handleTriggers}
              value={'disabled'}
              name={'disabled'}
              label={'Disable'}
              checked={this.state.trigger === 'disabled'}
            />
            &nbsp; the triggers and control the popover with external events
            {this.state.trigger === 'disabled' && (
              <Button onClick={this.togglePopover}>{this.state.isOpen ? 'Close' : 'Open'} Popover</Button>
            )}
          </div>

          <label>Live Demo</label>
          <div className="example-button">
            <Popover
              {...(this.state.trigger === 'disabled' ? { isOpen: this.state.isOpen } : {})}
              triggers={this.state.trigger}
              placement={this.state.placement}
              title="Popover Title"
              theme={this.state.theme}
              popoverContent={`My initial positioning is ${formattedPlacement}`}
            >
              <Button theme={this.state.theme} disabled={this.state.trigger === 'disabled'}>
                {this.state.trigger === 'disabled'
                  ? 'Trigger Disabled'
                  : `${formattedTrigger} me for ${formattedTheme} theme and ${formattedPlacement} positioned popover`}
              </Button>
            </Popover>
          </div>
        </div>
        <h3>Auto flip on boundaries and stay in container</h3>
        <label>Scroll the container</label>
        <div className="auto-flip-container">
          <div id="popover-boundaries" className="popover-example-container">
            <Popover
              triggers="disabled"
              isOpen={true}
              placement="left"
              title="Popover Title"
              theme="dark"
              popoverContent={`My initial positioning is left`}
              modifiers={{ preventOverflow: { enabled: true } }}
            >
              <Button>Anchor</Button>
            </Popover>
          </div>
        </div>
      </>
    );
  }
}

const exampleProps = {
  componentName: 'Popover',
  exampleCodeSnippet: `
    // Basic usage
    <Popover placement="left" title="Popover Title" popoverContent="Popover Left">
      <Button>Left</Button>
    </Popover>

    // Popper controlled by external events
    <Popover triggers="disabled" isOpen={this.state.isOpen} popoverContent="Popover evnet controlled">
      <Button>Right</Button>
    </Popover>

    // Non overflowing popover
    <Popover
      triggers="disabled"
      isOpen={true}
      placement="left"
      title="Popover Title"
      theme="dark"
      popoverContent="My initial positioning is left"
      modifiers={{ preventOverflow: { enabled: true } }}
    >
      <Button>Anchor</Button>
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
          note: 'Additional Class name for anchor element',
        },
        {
          propType: 'wrapperClassName',
          type: 'text',
          note: 'Additional className for the popover wrapper',
        },
        {
          propType: 'placement',
          type: 'oneOf[left, top, top-start, top-end, bottom-start, bottom, bottom-end, right, auto]',
          defaultValue: 'auto',
        },
        {
          propType: 'theme',
          type: 'oneOf[light, dark, warn, error, info, success]',
          defaultValue: 'light',
        },
        {
          propType: 'popoverContent',
          type: 'node',
          note: 'Popover content, can be a react element.',
        },
        {
          propType: 'trigger',
          type: 'oneOf[click, hover]',
          defaultValue: 'hover',
        },
        {
          propType: 'modifiers',
          type: 'PopperJS.Modifiers',
          note: <a href="https://popper.js.org/popper-documentation.html#modifiers">Popper Modifier Configurations</a>,
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
