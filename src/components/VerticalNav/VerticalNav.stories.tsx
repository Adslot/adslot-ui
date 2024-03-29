import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import VerticalNav from './index';
import SvgSymbol from '../SvgSymbol';

const meta = {
  title: 'Pending Review/VerticalNav',
  component: VerticalNav,
  tags: ['autodocs'],
} satisfies Meta<typeof VerticalNav>;

export default meta;

type Story = StoryObj<typeof meta>;

const MenuContent = ({ isActive, label, icon }) => {
  const activeStyles = isActive
    ? {
        borderRadius: '50%',
        backgroundColor: '#e5eaed',
      }
    : {};

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 12,
          ...activeStyles,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const DefaultComponent = (args) => {
  const [activeTab, setActiveTab] = React.useState('Tab 1');

  const handleMenuClick = (tabName) => () => {
    setActiveTab(tabName);
  };

  return (
    <VerticalNav {...args}>
      <VerticalNav.MenuItem
        onClick={handleMenuClick('Tab 1')}
        isActive={activeTab === 'Tab 1'}
        content={({ isCollapsed }) => (
          <MenuContent
            {...{
              isActive: activeTab === 'Tab 1',
              label: 'Product Details 1',
              icon: isCollapsed ? (
                <SvgSymbol href="svg-symbols.svg#arrow-bracket" />
              ) : (
                <SvgSymbol href="svg-symbols.svg#list" />
              ),
            }}
          />
        )}
        dts="test-menu-tab-1"
      >
        Culpa amet dolore ea tempor. Enim non culpa enim quis. Culpa proident in et est minim ullamco fugiat
        exercitation non ea. Sint voluptate amet magna velit ipsum labore sint commodo consequat. Aliquip tempor commodo
        ullamco elit deserunt incididunt ipsum do. <br />
        <br />
        Ea incididunt deserunt commodo consequat do non elit ea labore. Laborum irure mollit laborum nostrud ipsum ea.
        Cupidatat pariatur dolore fugiat occaecat elit eiusmod eu esse aliqua ut laborum occaecat nisi nisi. Sint veniam
        excepteur voluptate laboris. Anim duis id ea irure est laborum. <br />
        <br />
        Aute adipisicing fugiat cillum exercitation. Cillum tempor laboris cillum sit in cillum mollit dolor fugiat
        culpa amet aliquip. Velit qui laboris enim sunt officia tempor et id dolor mollit deserunt enim. <br />
        <br />
        Ipsum culpa do ea ut. Laboris aute Lorem ipsum anim. Exercitation velit cillum nisi ex anim aliqua amet pariatur
        consequat est ut sit fugiat deserunt. Magna non minim occaecat sunt cillum eiusmod ex. <br />
        <br />
        Minim labore culpa proident dolor ad nulla. Proident exercitation Lorem esse quis deserunt. Amet pariatur cillum
        et sit officia pariatur fugiat quis duis. Eiusmod duis veniam minim anim ex. Aute ipsum consequat commodo sint
        nostrud eu fugiat nulla enim veniam veniam reprehenderit reprehenderit deserunt. Incididunt non mollit fugiat et
        fugiat sunt veniam minim eu velit. Minim quis incididunt aliqua duis ut dolor occaecat magna est.
      </VerticalNav.MenuItem>
      <VerticalNav.MenuItem
        onClick={handleMenuClick('Tab 2')}
        isActive={activeTab === 'Tab 2'}
        content={({ isCollapsed }) => (
          <MenuContent
            {...{
              isCollapsed,
              isActive: activeTab === 'Tab 2',
              label: 'Product Details 2',
              icon: <SvgSymbol href="svg-symbols.svg#list" />,
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
};

export const Default: Story = {
  render: () => <DefaultComponent />,
  args: {},
};
