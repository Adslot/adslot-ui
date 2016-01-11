// Export all the components that are consumable.

require('styles/_bootstrap-custom.scss');
require('styles/_icheck-custom.scss');
require('styles/_react-toggle-custom.scss');

import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-icheck/lib/Checkbox';
import Modal from 'react-bootstrap/lib/Modal';
import Radio from 'react-icheck/lib/Radio';
import RadioGroup from 'react-icheck/lib/RadioGroup';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import Toggle from 'react-toggle';
import {
  Alert,
  Breadcrumb,
  Empty,
  Grid,
  GridCell,
  GridRow,
  Search,
  Slicey,
  Totals,
} from 'alexandria-adslot';

module.exports = {
  Alert,
  Breadcrumb,
  Button,
  Checkbox,
  Empty,
  Grid,
  GridCell,
  GridRow,
  Modal,
  Radio,
  RadioGroup,
  Search,
  Slicey,
  Tab,
  Tabs,
  Toggle,
  Totals,
};
