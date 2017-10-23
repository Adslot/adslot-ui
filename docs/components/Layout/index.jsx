import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';

import ButtonExample from '../../examples/ButtonExample';
import AlertInputExample from '../../examples/AlertInputExample';
import FilePickerExample from '../../examples/FilePickerExample';
import SpinnerButtonExample from '../../examples/SpinnerButtonExample';
import TextareaExample from '../../examples/TextareaExample';
import TextEllipsisExample from '../../examples/TextEllipsisExample';
import AlertExample from '../../examples/AlertExample';
import CheckboxExample from '../../examples/CheckboxExample';
import RadioExample from '../../examples/RadioExample';
import SelectExample from '../../examples/SelectExample';
import DatePickerExample from '../../examples/DatePickerExample';
import BorderedWellExample from '../../examples/BorderedWellExample';
import CardExample from '../../examples/CardExample';
import FlexibleSpacerExample from '../../examples/FlexibleSpacerExample';
import PageTitleExample from '../../examples/PageTitleExample';
import SliceyExample from '../../examples/SliceyExample';
import StatisticExample from '../../examples/StatisticExample';
import TagExample from '../../examples/TagExample';
import TotalsExample from '../../examples/TotalsExample';
import AvatarExample from '../../examples/AvatarExample';
import BreadcrumbExample from '../../examples/BreadcrumbExample';
import TabExample from '../../examples/TabExample';
import EmptyExample from '../../examples/EmptyExample';
import GridExample from '../../examples/GridExample';
import PrettyDiffExample from '../../examples/PrettyDiffExample';
import SpinnerExample from '../../examples/SpinnerExample';
import SvgSymbolExample from '../../examples/SvgSymbolExample';
import SvgSymbolCircleExample from '../../examples/SvgSymbolCircleExample';
import TileGridExample from '../../examples/TileGridExample';
import AccordionExample from '../../examples/AccordionExample';
import CarouselExample from '../../examples/CarouselExample';
import ConfirmModalExample from '../../examples/ConfirmModalExample';
import HelpIconPopoverExample from '../../examples/HelpIconPopoverExample';
import ListPickerExample from '../../examples/ListPickerExample';
import PagedGridExample from '../../examples/PagedGridExample';
import PanelExample from '../../examples/PanelExample';
import SearchExample from '../../examples/SearchExample';
import SearchBarExample from '../../examples/SearchBarExample';
import TreePickerExample from '../../examples/TreePickerExample';
import UserListPickerExample from '../../examples/UserListPickerExample';
import InformationBoxExample from '../../examples/InformationBoxExample';
import SplitPaneExample from '../../examples/SplitPaneExample';

import { PageTitle } from '../../../src/dist-entry';

import './styles.scss';
import '../../examples/styles.scss';

const SidebarArea = ({ children }) => <div className="adslot-ui-sidebar-area">{children}</div>;
const ContentArea = ({ children }) => <div className="adslot-ui-content-area">{children}</div>;

SidebarArea.propTypes = ContentArea.propTypes = {
  children: PropTypes.node.isRequired,
};

const componentsBySection = {
  'form-elements': [
    'button',
    'spinner-button',
    'alert-input',
    'file-picker',
    'textarea',
    'list-picker',
    'user-list-picker',
    'checkbox',
    'radio',
    'select',
    'date-picker',
  ],
  'typography-and-text-layout': [
    'text-ellipsis',
  ],
  'stats-and-data': [
    'statistic',
    'totals',
    'slicey',
  ],
  'icons-and-graphics': [
    'svg-symbol',
  ],
  navigation: [
    'breadcrumb',
    'tab',
  ],
  'feedback-and-states': [
    'alert',
    'empty',
    'spinner',
    'pretty-diff',
  ],
  dialogue: [
    'help-icon-popover',
    'avatar',
  ],
  modals: [
    'confirm-modal',
  ],
  search: [
    'search',
    'search-bar',
    'tag',
  ],
  grouping: [
    'page-title',
    'card',
    'panel',
    'accordion',
    'bordered-well',
    'carousel',
    'grid',
    'paged-grid',
    'tile-grid',
    'flexible-spacer',
    'split-pane',
    'information-box',
  ],
  'tree-picker': [
    'tree-picker',
  ],
};

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'buttons',
    };

    this.navigateTo = (newPage) => {
      if (newPage !== this.state.page) { this.setState({ page: newPage }); }
      window.location.href = `${window.location.origin}${window.location.pathname}#${newPage}-example`;
    };
  }

  render() {
    return (
      <div className="adslot-ui-layout">
        <Header />
        <div className="adslot-ui-body">
          <SidebarArea>
            <Navigation componentsBySection={componentsBySection} navigateTo={this.navigateTo} />
          </SidebarArea>
          <ContentArea>
            <PageTitle title="Form Elements" />
            <ButtonExample />
            <SpinnerButtonExample />
            <AlertInputExample />
            <FilePickerExample />
            <TextareaExample />
            <ListPickerExample />
            <UserListPickerExample />
            <CheckboxExample />
            <RadioExample />
            <SelectExample />
            <DatePickerExample />

            <PageTitle title="Typography and Text Layout" />
            <TextEllipsisExample />

            <PageTitle title="Stats and Data" />
            <StatisticExample />
            <TotalsExample />
            <SliceyExample />

            <PageTitle title="Icons and Graphics" />
            <SvgSymbolExample />
            <SvgSymbolCircleExample />

            <PageTitle title="Navigation" />
            <BreadcrumbExample />
            <TabExample />

            <PageTitle title="Feedback and States" />
            <AlertExample />
            <EmptyExample />
            <SpinnerExample />
            <PrettyDiffExample />

            <PageTitle title="Dialogue" />
            <HelpIconPopoverExample />
            <AvatarExample />

            <PageTitle title="Modals" />
            <ConfirmModalExample />

            <PageTitle title="Search" />
            <SearchExample />
            <SearchBarExample />
            <TagExample />

            <PageTitle title="Grouping" />
            <PageTitleExample />
            <CardExample />
            <PanelExample />
            <AccordionExample />
            <BorderedWellExample />
            <CarouselExample />
            <GridExample />
            <PagedGridExample />
            <TileGridExample />
            <FlexibleSpacerExample />
            <SplitPaneExample />
            <InformationBoxExample />

            <PageTitle title="Tree Picker" />
            <TreePickerExample />
          </ContentArea>
        </div>
      </div>
    );
  }
}


// <FormGroupExample />
// <ListPickerPureExample />


export default PageLayout;
