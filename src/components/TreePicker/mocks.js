import immutable from 'seamless-immutable';

const baseItem = {
  label: 'Awesome Product',
  value: 10000,
};

const auPath = { id: 'au', label: 'AU', path: [] };
const actPath = { id: 'au-act', label: 'ACT', path: [auPath] };

const actNode = {
  id: 'au-act',
  label: 'Australian Capital Territory',
  type: 'State',
  path: [auPath],
  value: 1000,
  rootTypeId: 'a',
  isSelectable: false,
};

const ntNode = {
  id: 'au-nt',
  label: 'Northern Territory',
  type: 'State',
  path: [auPath],
  value: 500,
  rootTypeId: 'a',
};
const qldNode = {
  id: 'au-qld',
  label: 'Queensland',
  type: 'State',
  path: [auPath],
  value: 500,
  rootTypeId: 'a',
};
const saNode = {
  id: 'au-sa',
  label: 'South Australia',
  type: 'State',
  path: [auPath],
  value: 500,
  rootTypeId: 'a',
};

const cbrNode = {
  id: 'au-act-cbr',
  label: 'Canberra',
  type: 'City',
  path: [auPath, actPath],
  value: 2000,
  rootTypeId: 'a',
  isExpandable: true,
};

const cbrNodeAlreadySelected = {
  id: 'au-act-cbr',
  label: 'Canberra',
  type: 'City',
  ancestors: [actPath, auPath],
  path: [],
  value: 2000,
  rootTypeId: 'a',
  isExpandable: true,
};

const maleNode = {
  id: 4,
  label: 'Males',
  type: '',
  path: [],
  value: 500,
  rootTypeId: 'b',
};

const valueFormatter = value => value;

const nodeRenderer = value => `Test value: ${value.label}`;

const initialSelection = [actNode, ntNode];

const itemType = 'example item type';

const TreePickerMocks = immutable({
  actNode,
  ntNode,
  baseItem,
  cbrNode,
  cbrNodeAlreadySelected,
  initialSelection,
  itemType,
  maleNode,
  nodeRenderer,
  qldNode,
  saNode,
  valueFormatter,
});

export default TreePickerMocks;
