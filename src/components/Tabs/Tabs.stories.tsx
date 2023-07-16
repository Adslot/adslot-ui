import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './index';
import Tab from '../Tab';
import SvgSymbol from '../SvgSymbol';
import Empty from '../Empty';

const meta = {
  title: 'Pending Review/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const Render = () => {
  const [activeTab, setActiveTab] = React.useState('Audience');
  const switchTab = (tabKey) => setActiveTab(tabKey);

  return (
    <Tabs activeKey={activeTab} onSelect={switchTab} id="audience-tab">
      <Tab
        eventKey="Audience"
        title={
          <span className="flexible-wrapper-inline">
            <SvgSymbol href="svg-symbols.svg#list" />
            Audience
          </span>
        }
      >
        <Empty collection={[]} text="No audience details." />
      </Tab>
      <Tab
        eventKey="Billing"
        title={
          <span className="flexible-wrapper-inline">
            <SvgSymbol href="svg-symbols.svg#calendar" />
            Billing
          </span>
        }
      >
        <Empty collection={[]} text="No billing information." />
      </Tab>
    </Tabs>
  );
};
export const Default: Story = {
  render: Render,
  args: {},
};
