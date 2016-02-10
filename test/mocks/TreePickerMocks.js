import { deepFreeze } from 'testHelpers/deepSetObjectMutability';

const baseItem = {
  label: 'Awesome Product',
  value: 10000,
};

const rootTypes = [
  {
    label: 'Geography',
    id: 'a',
    icon: 'http://placehold.it/16x16',
    emptyIcon: 'http://placehold.it/70x70',
    isRequired: true,
  },
  { label: 'Audiences', id: 'b', icon: 'http://placehold.it/16x16', isRequired: false },
  { label: 'Segments', id: 'c', icon: 'http://placehold.it/16x16', isRequired: true },
];

const auPath = { id: 'au', label: 'AU' };
const actPath = { id: 'au-act', label: 'ACT' };

const actNode =
  { id: 'au-act', label: 'Australian Capital Territory', type: 'State', path: [auPath], value: 1000, rootTypeId: 'a' };
const ntNode = { id: 'au-nt', label: 'Northern Territory', type: 'State', path: [auPath], value: 500, rootTypeId: 'a' };
const qldNode = { id: 'au-qld', label: 'Queensland', type: 'State', path: [auPath], value: 500, rootTypeId: 'a' };
const saNode = { id: 'au-sa', label: 'South Australia', type: 'State', path: [auPath], value: 500, rootTypeId: 'a' };

const cbrNode = {
  id: 'au-act-cbr',
  label: 'Canberra',
  type: 'City',
  path: [auPath, actPath],
  value: 2000,
  rootTypeId: 'a',
  isExpandable: true,
};

const maleNode = { id: '4', label: 'Males', type: '', path: [], value: 500, rootTypeId: 'b' };

const valueFormatter = (value) => value;

const initialSelection = [
  actNode,
  ntNode,
];

const TreePickerMocks = {
  actNode,
  ntNode,
  rootTypes,
  baseItem,
  cbrNode,
  initialSelection,
  maleNode,
  qldNode,
  saNode,
  valueFormatter,
};

deepFreeze(TreePickerMocks);
export default TreePickerMocks;
