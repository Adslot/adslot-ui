import ButtonExample from '../examples/Button.mdx';
import AccordionExample from '../examples/Accordion.mdx';
import PanelExample from '../examples/Panel.mdx';
import ActionPanelExample from '../examples/ActionPanel.mdx';
import TagExample from '../examples/Tag.mdx';
import AlertExample from '../examples/Alert.mdx';
import AlertInputExample from '../examples/AlertInput.mdx';
import AvatarExample from '../examples/Avatar.mdx';
import BorderedWellExample from '../examples/BorderedWell.mdx';
import BreadcrumbExample from '../examples/Breadcrumb.mdx';
import ButtonGroupExample from '../examples/ButtonGroup.mdx';
import CardExample from '../examples/Card.mdx';
import CarouselExample from '../examples/Carousel.mdx';
import CheckboxExample from '../examples/Checkbox.mdx';
import CheckboxGroupExample from '../examples/CheckboxGroup.mdx';
import ConfirmModalExample from '../examples/ConfirmModal.mdx';
import CountBadgeExample from '../examples/CountBadge.mdx';
import DatePickerExample from '../examples/DatePicker.mdx';
import EmptyExample from '../examples/Empty.mdx';
import FilePickerExample from '../examples/FilePicker.mdx';
import FlexibleSpacer from '../examples/FlexibleSpacer.mdx';
import GridExample from '../examples/Grid.mdx';
import HelpIconPopoverExample from '../examples/HelpIconPopover.mdx';
import PrettyDiffExample from '../examples/PrettyDiff.mdx';
import HoverDropdownMenuExample from '../examples/HoverDropdownMenu.mdx';
import InformationBoxExample from '../examples/InformationBox.mdx';
import ImageCropperExample from '../examples/ImageCropper.mdx';
import ListPickerExample from '../examples/ListPicker.mdx';
import NavigationExample from '../examples/Navigation.mdx';
import OverlayLoaderExample from '../examples/OverlayLoader.mdx';
import PageTitleExample from '../examples/PageTitle.mdx';
import PagedGridExample from '../examples/PagedGrid.mdx';
import PopoverExample from '../examples/Popover.mdx';
import RadioExample from '../examples/Radio.mdx';
import RadioGroupExample from '../examples/RadioGroup.mdx';
import SearchExample from '../examples/Search.mdx';
import SelectExample from '../examples/Select.mdx';
import SliceyExample from '../examples/Slicey.mdx';
import SpinnerExample from '../examples/Spinner.mdx';
import SplitPaneExample from '../examples/SplitPane.mdx';
import StatisticExample from '../examples/Statistic.mdx';
import StatusPillExample from '../examples/StatusPill.mdx';
import SvgSymbolExample from '../examples/SvgSymbol.mdx';
import SwitchExample from '../examples/Switch.mdx';
import TabExample from '../examples/Tab.mdx';
import TextEllipsisExample from '../examples/TextEllipsis.mdx';
import TextareaExample from '../examples/Textarea.mdx';
import TileGridExample from '../examples/TileGrid.mdx';
import TotalsExample from '../examples/Totals.mdx';
import TreePickerExample from '../examples/TreePicker.mdx';
import UserListPickerExample from '../examples/UserListPicker.mdx';
import VerticalNavigationExample from '../examples/VerticalNavigation.mdx';
import Introduction from '../examples/Introduction.mdx';
import DesignGuide from '../examples/DesignGuide.mdx';
import Installation from './components/GettingStarted/Installation.md';
import Contributing from './components/GettingStarted/Contributing.md';
import RichTextEditorExample from '../examples/RichTextEditor.mdx';

const routes = [
  {
    path: '/',
    component: Introduction,
    title: 'Introduction',
    group: 'Getting Started',
  },
  {
    path: '/installation',
    component: Installation,
    title: 'Installation',
    group: 'Getting Started',
  },
  {
    path: '/design-guide',
    component: DesignGuide,
    title: 'Design Guide',
    group: 'Getting Started',
  },
  {
    path: '/contributing',
    component: Contributing,
    title: 'Contributing',
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
    path: '/image-cropper',
    component: ImageCropperExample,
    title: 'Image Cropper',
    group: 'Components',
  },
  {
    path: '/list-picker',
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
    path: '/switch',
    component: SwitchExample,
    title: 'Switch',
    group: 'Components',
  },
  {
    path: '/tab',
    component: TabExample,
    title: 'Tab',
    group: 'Components',
  },
  {
    path: '/text-ellipsis',
    component: TextEllipsisExample,
    title: 'Text Ellipsis',
    group: 'Components',
  },
  {
    path: '/textarea',
    component: TextareaExample,
    title: 'Textarea',
    group: 'Components',
  },
  {
    path: '/tile-grid',
    component: TileGridExample,
    title: 'Tile Grid',
    group: 'Components',
  },
  {
    path: '/totals',
    component: TotalsExample,
    title: 'Totals',
    group: 'Components',
  },
  {
    path: '/tree-picker',
    component: TreePickerExample,
    title: 'Tree Picker',
    group: 'Components',
  },
  {
    path: '/user-list-picker',
    component: UserListPickerExample,
    title: 'User List Picker',
    group: 'Components',
  },
  {
    path: '/vertical-navigation',
    component: VerticalNavigationExample,
    title: 'Vertical Navigation',
    group: 'Components',
  },
  {
    path: '/rich-text-editor',
    component: RichTextEditorExample,
    title: 'Rich Text Editor',
    group: 'Components',
  },
];

export default routes;
