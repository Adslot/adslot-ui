import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';
import Contributors from '../Contributors';
import SearchBar from '../SearchBar';
<<<<<<< HEAD
import SearchResultCard from '../SearchResultCard';
=======
>>>>>>> 248c9c7... Docs: Add searchbar component

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
import HoverDropdownMenuExample from '../../examples/HoverDropdownMenuExample';
import NavigationExample from '../../examples/NavigationExample';

import { PageTitle } from '../../../src/dist-entry';

import './styles.scss';
import '../../examples/styles.scss';

const SidebarArea = ({ children }) => <div className="adslot-ui-sidebar-area">{children}</div>;
const ContentArea = ({ children }) => <div className="adslot-ui-content-area">{children}</div>;

SidebarArea.propTypes = {
  children: PropTypes.node.isRequired,
};

ContentArea.propTypes = SidebarArea.propTypes;

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
    'hover-dropdown-menu',
    'navigation-tabs',
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

const componentIndexForSearch = _.flatMap(componentsBySection);

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'buttons',
      searchTerm: '',
      searchResults: [],
    };

    this.navigateTo = (newPage) => {
      if (newPage !== this.state.page) { this.setState({ page: newPage }); }
      window.location.href = `${window.location.origin}${window.location.pathname}#${newPage}-example`;
    };

    this.filterComponents = (searchTerm) => {
      const searchTermRegExp = new RegExp(searchTerm, 'i');
      return _(componentIndexForSearch)
        .filter((val) => searchTermRegExp.test(val))
        .sort()
        .value();
    };

    this.handleSearch = (searchTerm) => {
      if (searchTerm.length === 0) {
        this.clearSearch();
      } else {
        this.setState({
          searchTerm,
          searchResults: this.filterComponents(searchTerm),
        });
      }
    };

    this.clearSearch = () => {
      this.setState({
        searchTerm: '',
        searchResults: [],
      });
    };
  }

  handleSearch(searchText) {
    console.log(searchText);
  }

  render() {
    return (
      <div className="adslot-ui-layout">
        <Header />
        <div className="adslot-ui-body">
          <SidebarArea>
<<<<<<< HEAD
            <SearchBar onSearch={this.handleSearch} />
            {
              (this.state.searchTerm.length > 0 || this.state.searchResults.length > 0)
                ? (<SearchResultCard
                  searchResults={this.state.searchResults}
                  navigateTo={this.navigateTo}
                  clearSearch={this.clearSearch}
                />)
                : <Navigation componentsBySection={componentsBySection} navigateTo={this.navigateTo} />
            }
=======
            <SearchBar searchCB={this.handleSearch} />
            <Navigation componentsBySection={componentsBySection} navigateTo={this.navigateTo} />
>>>>>>> 248c9c7... Docs: Add searchbar component
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
            <HoverDropdownMenuExample />
            <NavigationExample />

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


        <Contributors />
      </div>
    );
  }
}


// <FormGroupExample />
// <ListPickerPureExample />


export default PageLayout;
