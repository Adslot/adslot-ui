import ButtonExample from '../mdexamples/Button.mdx';
import AccordionExample from '../mdexamples/Accordion.mdx';
import PanelExample from '../mdexamples/Panel.mdx';
import ActionPanelExample from '../mdexamples/ActionPanel.mdx';
import TagExample from '../mdexamples/Tag.mdx';
import AlertExample from '../mdexamples/Alert.mdx';
import AlertInputExample from '../mdexamples/AlertInput.mdx';
import AvatarExample from '../mdexamples/Avatar.mdx';
import BorderedWellExample from '../mdexamples/BorderedWell.mdx';
import BreadcrumbExample from '../mdexamples/Breadcrumb.mdx';
import ButtonGroupExample from '../mdexamples/ButtonGroup.mdx';
import CardExample from '../mdexamples/Card.mdx';
import CarouselExample from '../mdexamples/Carousel.mdx';
import CheckboxExample from '../mdexamples/Checkbox.mdx';
import CheckboxGroupExample from '../mdexamples/CheckboxGroup.mdx';
import ConfirmModalExample from '../mdexamples/ConfirmModal.mdx';
import CountBadgeExample from '../mdexamples/CountBadge.mdx';
import DatePickerExample from '../mdexamples/DatePicker.mdx';
import EmptyExample from '../mdexamples/Empty.mdx';
import FilePickerExample from '../mdexamples/FilePicker.mdx';
import FlexibleSpacer from '../mdexamples/FlexibleSpacer.mdx';
import GridExample from '../mdexamples/Grid.mdx';
import HelpIconPopoverExample from '../mdexamples/HelpIconPopover.mdx';
import PrettyDiffExample from '../mdexamples/PrettyDiff.mdx';
import HoverDropdownMenuExample from '../mdexamples/HoverDropdownMenu.mdx';
import InformationBoxExample from '../mdexamples/InformationBox.mdx';
import ListPickerExample from '../mdexamples/ListPicker.mdx';
import NavigationExample from '../mdexamples/Navigation.mdx';
import OverlayLoaderExample from '../mdexamples/OverlayLoader.mdx';
import PageTitleExample from '../mdexamples/PageTitle.mdx';
import PagedGridExample from '../mdexamples/PagedGrid.mdx';
import PopoverExample from '../mdexamples/Popover.mdx';
import GettingStarted from '../components/GettingStarted.md';
import RadioExample from '../mdexamples/Radio.mdx';
import RadioGroupExample from '../mdexamples/RadioGroup.mdx';
import SearchExample from '../mdexamples/Search.mdx';
import SelectExample from '../mdexamples/Select.mdx';
import SliceyExample from '../mdexamples/Slicey.mdx';
import SpinnerExample from '../mdexamples/Spinner.mdx';
import SplitPaneExample from '../mdexamples/SplitPane.mdx';
import StatisticExample from '../mdexamples/Statistic.mdx';
import StatusPillExample from '../mdexamples/StatusPill.mdx';
import SvgSymbolExample from '../mdexamples/SvgSymbol.mdx';
import SvgSymbolCircleExample from '../mdexamples/SvgSymbolCircle.mdx';
import SwitchExample from '../mdexamples/Switch.mdx';

const routes = [
  {
    path: '/',
    component: GettingStarted,
    title: 'Installation',
    group: 'Getting Started',
  },
  {
    path: '/button',
    component: ButtonExample,
    title: 'Button',
    group: 'Components',
  },
  {
    path: '/accordion',
    component: AccordionExample,
    title: 'Accordion',
    group: 'Components',
  },
  {
    path: '/panel',
    component: PanelExample,
    title: 'Panel',
    group: 'Components',
  },
  {
    path: '/tag',
    component: TagExample,
    title: 'Tag',
    group: 'Components',
  },
  {
    path: '/action-panel',
    component: ActionPanelExample,
    title: 'Action Panel',
    group: 'Components',
  },
  {
    path: '/alert',
    component: AlertExample,
    title: 'Alert',
    group: 'Components',
  },
  {
    path: '/alert-input',
    component: AlertInputExample,
    title: 'Alert Input',
    group: 'Components',
  },
  {
    path: '/avatar',
    component: AvatarExample,
    title: 'Avatar',
    group: 'Components',
  },
  {
    path: '/bordered-well',
    component: BorderedWellExample,
    title: 'Bordered Well',
    group: 'Components',
  },
  {
    path: '/breadcrumb',
    component: BreadcrumbExample,
    title: 'Breadcrumb',
    group: 'Components',
  },
  {
    path: '/button-group',
    component: ButtonGroupExample,
    title: 'Button Group',
    group: 'Components',
  },
  {
    path: '/card',
    component: CardExample,
    title: 'Card',
    group: 'Components',
  },
  {
    path: '/carousel',
    component: CarouselExample,
    title: 'Carousel',
    group: 'Components',
  },
  {
    path: '/checkbox',
    component: CheckboxExample,
    title: 'Checkbox',
    group: 'Components',
  },
  {
    path: '/checkbox-group',
    component: CheckboxGroupExample,
    title: 'Checkbox Group',
    group: 'Components',
  },
  {
    path: '/confirm-modal',
    component: ConfirmModalExample,
    title: 'Confirm Modal',
    group: 'Components',
  },
  {
    path: '/count-badge',
    component: CountBadgeExample,
    title: 'Count Badge',
    group: 'Components',
  },
  {
    path: '/date-picker',
    component: DatePickerExample,
    title: 'Date Picker',
    group: 'Components',
  },
  {
    path: '/empty',
    component: EmptyExample,
    title: 'Empty',
    group: 'Components',
  },
  {
    path: '/file-picker',
    component: FilePickerExample,
    title: 'File Picker',
    group: 'Components',
  },
  {
    path: '/flexible-spacer',
    component: FlexibleSpacer,
    title: 'Flexible Spacer',
    group: 'Components',
  },
  {
    path: '/grid',
    component: GridExample,
    title: 'Grid',
    group: 'Components',
  },
  {
    path: '/help-icon-popover',
    component: HelpIconPopoverExample,
    title: 'Help Icon Popover',
    group: 'Components',
  },
  {
    path: '/pretty-diff',
    component: PrettyDiffExample,
    title: 'Pretty Diff',
    group: 'Components',
  },
  {
    path: '/hover-dropdown-menu',
    component: HoverDropdownMenuExample,
    title: 'Hover Dropdown Menu',
    group: 'Components',
  },
  {
    path: '/information-box',
    component: InformationBoxExample,
    title: 'Information Box',
    group: 'Components',
  },
  {
    path: '/listpicker',
    component: ListPickerExample,
    title: 'List Picker',
    group: 'Components',
  },
  {
    path: '/navigation',
    component: NavigationExample,
    title: 'Navigation',
    group: 'Components',
  },
  {
    path: '/overlay-loader',
    component: OverlayLoaderExample,
    title: 'Overlay Loader',
    group: 'Components',
  },
  {
    path: '/page-title',
    component: PageTitleExample,
    title: 'Page Title',
    group: 'Components',
  },
  {
    path: '/paged-grid',
    component: PagedGridExample,
    title: 'Paged Grid',
    group: 'Components',
  },
  {
    path: '/popover',
    component: PopoverExample,
    title: 'Popover',
    group: 'Components',
  },
  {
    path: '/radio',
    component: RadioExample,
    title: 'Radio',
    group: 'Components',
  },
  {
    path: '/radio-group',
    component: RadioGroupExample,
    title: 'Radio Group',
    group: 'Components',
  },
  {
    path: '/search',
    component: SearchExample,
    title: 'Search',
    group: 'Components',
  },
  {
    path: '/select',
    component: SelectExample,
    title: 'Select',
    group: 'Components',
  },
  {
    path: '/slicey',
    component: SliceyExample,
    title: 'Slicey',
    group: 'Components',
  },
  {
    path: '/spinner',
    component: SpinnerExample,
    title: 'Spinner',
    group: 'Components',
  },
  {
    path: '/split-pane',
    component: SplitPaneExample,
    title: 'Split Pane',
    group: 'Components',
  },
  {
    path: '/statistic',
    component: StatisticExample,
    title: 'Statistic',
    group: 'Components',
  },
  {
    path: '/status-pill',
    component: StatusPillExample,
    title: 'Status Pill',
    group: 'Components',
  },
  {
    path: '/svg-symbol',
    component: SvgSymbolExample,
    title: 'Svg Symbol',
    group: 'Components',
  },
  {
    path: '/svg-symbol-circle',
    component: SvgSymbolCircleExample,
    title: 'Svg Symbol Circle',
    group: 'Components',
  },
  {
    path: '/switch',
    component: SwitchExample,
    title: 'Switch',
    group: 'Components',
  },
];

export default routes;
