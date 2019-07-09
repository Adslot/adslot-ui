import React from 'react';
import Example from '../components/Example';
import { VerticalNav } from '../../src';

const MenuContent = ({ isCollapsed, isActive, label, icon }) => (
  <div className="menu-content">
    <div className="menu-icon">{icon}</div>
    <div className="menu-label">{label}</div>
  </div>
);

class VerticalNavigationExample extends React.PureComponent {
  state = {
    isCollapsed: false,
    activeTab: 'Tab 1',
  };

  handleCollapse = () => this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));

  handleMenuClick = tabName => () => this.setState({ activeTab: tabName });

  renderMenu1 = ({ isCollapsed }) => (
    <MenuContent
      {...{
        isCollapsed,
        label: 'Product Details 1',
        icon: isCollapsed ? <div className="burger-icon" /> : <div className="product-details-icon" />,
      }}
    />
  );

  render() {
    return (
      <VerticalNav isCollapsed={this.state.isCollapsed} onClick={this.handleCollapse}>
        <VerticalNav.MenuItem
          onClick={this.handleMenuClick('Tab 1')}
          isActive={this.state.activeTab === 'Tab 1'}
          content={this.renderMenu1}
          dts="test-menu-tab-1"
        >
          this is a content
        </VerticalNav.MenuItem>
        <VerticalNav.MenuItem
          onClick={this.handleMenuClick('Tab 2')}
          isActive={this.state.activeTab === 'Tab 2'}
          content={({ isCollapsed }) => (
            <MenuContent
              {...{
                isCollapsed,
                label: 'Product Details 2',
                icon: <div className="product-details-icon" />,
              }}
            />
          )}
        >
          this is another content
        </VerticalNav.MenuItem>
      </VerticalNav>
    );
  }
}

const exampleProps = {
  componentName: 'Vertical Navigation Tabs',
  exampleCodeSnippet: `
<VerticalNav isCollapsed={this.state.isCollapsed} onClick={this.handleCollapse}>
  <VerticalNav.MenuItem
    onClick={this.handleMenuClick('Tab 1')}
    isActive={this.state.activeTab === 'Tab 1'}
    content={this.renderMenu1}
    dts="test-menu-tab-1"
  >
    this is a content
  </VerticalNav.MenuItem>
  <VerticalNav.MenuItem
    onClick={this.handleMenuClick('Tab 2')}
    isActive={this.state.activeTab === 'Tab 2'}
    content={({ isCollapsed }) => (
      <MenuContent
        {...{
          isCollapsed,
          label: 'Product Details 2',
          icon: <div className="product-details-icon" />,
        }}
      />
    )}
  >
    this is another content
  </VerticalNav.MenuItem>
</VerticalNav>
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'isCollapsed',
          type: 'bool',
          defaultValue: <pre>false</pre>,
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'data-test-selector; used for testing purposes',
        },
        {
          propType: 'onClick',
          type: 'func',
          note: (
            <div>
              event handler for clicking on the collapse/expand button <br />
              <pre>const onClick = () => ...</pre>
            </div>
          ),
        },
        {
          propType: 'className',
          type: 'string',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <VerticalNavigationExample />
  </Example>
);
