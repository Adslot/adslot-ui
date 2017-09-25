import _ from 'lodash';
import React from 'react';
import {
  Accordion,
  PageTitle,
  SvgSymbol,
} from '../src/dist-entry';
import Main from './Main';

require('./styles.scss');

const SrcComponents = [
  'Accordion',
  'Alert',
  'Alert Input',
  'Avatar',
  'Bordered Well',
  'Breadcrumb',
  'Button',
  'Card',
  'Carousel',
  'Checkbox',
  'Empty',
  'File Picker',
  'Flexible Spacer',
  'Grid',
  'Grid Cell',
  'Grid Row',
  'Help Icon',
  'List Picker',
  'Modal',
  'Paged Grid',
  'Page Title',
  'Pagination',
  'Panel',
  'Pretty Diff',
  'Radio',
  'Search',
  'Search Bar',
  'Select',
  'Slicey',
  'Spinner',
  'Spinner Button',
  'Split Pane',
  'Statistic',
  'Svg Symbol',
  'Svg Symbol Circle',
  'Tab',
  'Tabs',
  'Tag',
  'Textarea',
  'Text Ellipsis',
  'Tile Grid',
  'Totals',
  'Tree Picker Simple Pure',
  'User List Picker',
];

const ComponentList = _.map(SrcComponents, (key) => <li key={`#${_.kebabCase(key)}`}>
  <a href={`#${_.kebabCase(key)}`}>{key}</a>
</li>);


const Navigation = () => {
  const pages = [{
    id: 'components',
    title: 'Components',
    isCollapsed: false,
    content: <ul className="list-unstyled">{ComponentList}</ul>,
  }];

  return <Accordion panels={pages} onPanelClick={_.noop} />;
};


const PageLayout = () =>
  <div className="adslotui-layout">
    <PageTitle title={<SvgSymbol href="/assets/svg-symbols.svg#logo" />} />
    <div className="adslotui-layout-content">
      <div className="adslotui-layout-content-left">
        <Navigation />
      </div>
      <div className="adslotui-layout-content-right">
        <Main />
      </div>
    </div>
  </div>;


export default PageLayout;
