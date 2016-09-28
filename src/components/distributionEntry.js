// Export the consumable components.
import Accordion from 'components/adslotUi/AccordionComponent';
import Button from 'react-bootstrap/lib/Button';
import SearchBar from 'components/adslotUi/SearchBarComponent';
import Checkbox from 'react-icheck/lib/Checkbox';
import ConfirmModal from 'components/adslotUi/ConfirmModalComponent';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import FilePicker from 'components/adslotUi/FilePickerComponent';
import FormGroup from 'components/adslotUi/FormGroupComponent';
import ListPicker from 'components/adslotUi/ListPickerComponent';
import ListPickerPure from 'components/adslotUi/ListPickerPureComponent';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import PagedGrid from 'components/adslotUi/PagedGridComponent';
import Pagination from 'react-bootstrap/lib/Pagination';
import Panel from 'components/adslotUi/PanelComponent';
import Popover from 'react-bootstrap/lib/Popover';
import Radio from 'react-icheck/lib/Radio';
import RadioGroup from 'react-icheck/lib/RadioGroup';
import Select from 'react-select';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import Toggle from 'react-toggle';
import TreePicker from 'components/adslotUi/TreePickerComponent';
import TreePickerSimplePure from 'components/adslotUi/TreePickerSimplePureComponent';
import UserListPicker from 'components/adslotUi/UserListPickerComponent';
import {
  Alert,
  Avatar,
  BorderedWell,
  Breadcrumb,
  Card,
  Empty,
  FlexibleSpacer,
  Grid,
  GridCell,
  GridRow,
  PageTitle,
  PrettyDiff,
  Search,
  Slicey,
  Statistic,
  SvgSymbol,
  SvgSymbolCircle,
  Tag,
  Totals,
} from 'alexandria-adslot';

require('styles/_bootstrap-custom.scss');
require('styles/_icheck-custom.scss');
require('styles/_react-select-custom.scss');
require('styles/_react-toggle-custom.scss');
require('styles/_react-datepicker-custom.scss');

module.exports = {
  Accordion,
  Alert,
  Avatar,
  BorderedWell,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  ConfirmModal,
  DatePicker,
  Empty,
  FilePicker,
  FlexibleSpacer,
  FormGroup,
  Grid,
  GridCell,
  GridRow,
  ListPicker,
  ListPickerPure,
  Modal,
  OverlayTrigger,
  PagedGrid,
  PageTitle,
  Pagination,
  Panel,
  Popover,
  PrettyDiff,
  Radio,
  RadioGroup,
  SearchBar,
  SearchField: Search,
  Select,
  Slicey,
  Statistic,
  SvgSymbol,
  SvgSymbolCircle,
  Tab,
  Tabs,
  Tag,
  Toggle,
  Totals,
  TreePicker,
  TreePickerSimplePure,
  UserListPicker,
};
