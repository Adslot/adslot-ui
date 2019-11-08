import React from 'react';
import Example from '../components/Example';
import { Button, ButtonGroup, OverlayTrigger, Popover, SvgSymbol } from '../../src';
import { Overlay } from 'react-bootstrap';

class ButtonGroupExample extends React.PureComponent {
  state = {
    isDropdownOpen: false,
  };

  buttonRef = React.createRef();

  render() {
    return (
      <React.Fragment>
        <ButtonGroup bsStyle="success">
          <Button>Approve</Button>
          <Popover triggers="click" placement="bottom" popoverContent="I am a popover on click!">
            <Button>
              <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
            </Button>
          </Popover>
        </ButtonGroup>
        <ButtonGroup bsStyle="danger" inverse={true}>
          <Button>Reject</Button>
          <Popover
            triggers="disabled"
            isOpen={this.state.isDropdownOpen}
            id="popover-2"
            popoverContent="I am a Overlay on click!"
            placement="bottom"
          >
            <Button
              onClick={() =>
                this.setState(prevState => ({
                  isDropdownOpen: !prevState.isDropdownOpen,
                }))
              }
              ref={this.buttonRef}
            >
              <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
            </Button>
          </Popover>
        </ButtonGroup>
        <ButtonGroup bsStyle="primary" dts="button-group">
          <Button dts="button-sign-off">Sign off</Button>
          <Button onClick={() => alert('>I am a Alert on click!')}>
            <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
          </Button>
        </ButtonGroup>
        <ButtonGroup bsStyle="warning" inverse={true} disabled={true}>
          <Button>Disabled</Button>
          <Button>
            <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
          </Button>
        </ButtonGroup>
      </React.Fragment>
    );
  }
}

export const exampleProps = {
  componentName: 'Button Group',
  exampleCodeSnippet: `
  <ButtonGroup bsStyle="success">
    <Button>Approve</Button>
    <Popover triggers="click" placement="bottom" popoverContent="I am a popover on click!">
      <Button>
        <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
      </Button>
    </Popover>
  </ButtonGroup>
  <ButtonGroup bsStyle="danger" inverse={true}>
    <Button>Reject</Button>
    <Popover
      triggers="disabled"
      isOpen={this.state.isDropdownOpen}
      id="popover-2"
      popoverContent="I am a Overlay on click!"
      placement="bottom"
    >
      <Button
        onClick={() =>
          this.setState(prevState => ({
            isDropdownOpen: !prevState.isDropdownOpen,
          }))
        }
        ref={this.buttonRef}
      >
        <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
      </Button>
    </Popover>
  </ButtonGroup>
  <ButtonGroup bsStyle="primary">
    <Button>Sign off</Button>
    <Button onClick={() => alert('>I am a Alert on click!')}>
      <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
    </Button>
  </ButtonGroup>
  <ButtonGroup bsStyle="warning" inverse={true} disabled={true}>
    <Button>Disabled</Button>
    <Button>
      <SvgSymbol className="svg-icon" href="./assets/svg-symbols.svg#caret-down" />
    </Button>
  </ButtonGroup>
  `,
  designNotes: (
    <p>
      <span className="text-bold">Button Groups</span> provides a layout for a two or more buttons to share common style
      and functionality but with independent events.
    </p>
  ),
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'bsStyle',
          type: 'string, oneOf primary, default, success, info, warning or danger',
          defaultValue: 'default',
        },
        {
          propType: 'inverse',
          type: 'bool',
          note: 'Renders an inverse button. Can be used with bsStyle to create primary inverse buttons.',
          defaultValue: 'false',
        },
        {
          propType: 'disabled',
          type: 'bool',
          note: 'Disables entire button group',
          defaultValue: 'false',
        },
        {
          propType: 'bsSize',
          type: 'string',
          note: 'small, large',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <ButtonGroupExample />
  </Example>
);
