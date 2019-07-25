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

  render() {
    return (
      <VerticalNav isCollapsed={this.state.isCollapsed} onClick={this.handleCollapse}>
        <VerticalNav.MenuItem
          onClick={this.handleMenuClick('Tab 1')}
          isActive={this.state.activeTab === 'Tab 1'}
          content={({ isCollapsed }) => (
            <MenuContent
              {...{
                isCollapsed,
                label: 'Product Details 1',
                icon: isCollapsed ? <div className="burger-icon" /> : <div className="product-details-icon" />,
              }}
            />
          )}
          dts="test-menu-tab-1"
        >
          Culpa amet dolore ea tempor. Enim non culpa enim quis. Culpa proident in et est minim ullamco fugiat
          exercitation non ea. Sint voluptate amet magna velit ipsum labore sint commodo consequat. Aliquip tempor
          commodo ullamco elit deserunt incididunt ipsum do. <br />
          <br />
          Ea incididunt deserunt commodo consequat do non elit ea labore. Laborum irure mollit laborum nostrud ipsum ea.
          Cupidatat pariatur dolore fugiat occaecat elit eiusmod eu esse aliqua ut laborum occaecat nisi nisi. Sint
          veniam excepteur voluptate laboris. Anim duis id ea irure est laborum. <br />
          <br />
          Aute adipisicing fugiat cillum exercitation. Cillum tempor laboris cillum sit in cillum mollit dolor fugiat
          culpa amet aliquip. Velit qui laboris enim sunt officia tempor et id dolor mollit deserunt enim. <br />
          <br />
          Ipsum culpa do ea ut. Laboris aute Lorem ipsum anim. Exercitation velit cillum nisi ex anim aliqua amet
          pariatur consequat est ut sit fugiat deserunt. Magna non minim occaecat sunt cillum eiusmod ex. <br />
          <br />
          Minim labore culpa proident dolor ad nulla. Proident exercitation Lorem esse quis deserunt. Amet pariatur
          cillum et sit officia pariatur fugiat quis duis. Eiusmod duis veniam minim anim ex. Aute ipsum consequat
          commodo sint nostrud eu fugiat nulla enim veniam veniam reprehenderit reprehenderit deserunt. Incididunt non
          mollit fugiat et fugiat sunt veniam minim eu velit. Minim quis incididunt aliqua duis ut dolor occaecat magna
          est.
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
          Reprehenderit velit nulla consequat duis. Nisi commodo esse magna eiusmod cillum laboris laboris nisi Lorem
          voluptate. Ut culpa occaecat enim aliqua magna in id et sunt laborum nostrud esse deserunt. <br />
          <br />
          Occaecat cillum culpa occaecat nulla laboris tempor in mollit exercitation id pariatur nisi. Tempor cupidatat
          est ad reprehenderit veniam. In id do dolore officia esse nostrud consequat anim Lorem deserunt sint fugiat.
          Dolor minim minim sint ut laborum. Laborum est labore minim cillum do nisi. Elit eu aliqua et qui. Culpa quis
          magna exercitation est. <br />
          <br />
          Est aliquip nostrud voluptate tempor ea commodo. Sint voluptate elit minim cillum nostrud mollit qui ullamco
          pariatur deserunt incididunt labore eiusmod reprehenderit. In ut minim laborum Lorem amet ipsum enim nulla ex
          laboris. Lorem in culpa ut exercitation fugiat elit ut velit.
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
    content={({ isCollapsed }) => (
      <MenuContent
        {...{
          isCollapsed,
          label: 'Product Details 1',
          icon: isCollapsed ? <div className="burger-icon" /> : <div className="product-details-icon" />,
        }}
      />
    )}
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

// Rendering menu item, can be customized for expanded and collapsed mode
<VerticalNav.MenuItem
  content={({ isCollapsed }) => isCollapsed ? <div>Collapsed</div> : <div>Expanded</div>}
  ...
>
  some tab content
</VerticalNav.MenuItem>
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
