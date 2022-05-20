import immutable from 'seamless-immutable';
var baseItem = {
  label: 'Awesome Product',
  value: 10000
};
var auPath = {
  id: 'au',
  label: 'AU',
  path: []
};
var actPath = {
  id: 'au-act',
  label: 'ACT',
  path: [auPath]
};
var actNode = {
  id: 'au-act',
  label: 'Australian Capital Territory',
  type: 'State',
  path: [auPath],
  value: 1000,
  rootTypeId: 'a',
  isSelectable: false
};
var ntNode = {
  id: 'au-nt',
  label: 'Northern Territory',
  type: 'State',
  path: [auPath],
  value: 500,
  rootTypeId: 'a'
};
var qldNode = {
  id: 'au-qld',
  label: 'Queensland',
  type: 'State',
  path: [auPath],
  value: 500,
  rootTypeId: 'a'
};
var saNode = {
  id: 'au-sa',
  label: 'South Australia',
  type: 'State',
  path: [auPath],
  value: 500,
  rootTypeId: 'a'
};
var cbrNode = {
  id: 'au-act-cbr',
  label: 'Canberra',
  type: 'City',
  path: [auPath, actPath],
  value: 2000,
  rootTypeId: 'a',
  isExpandable: true
};
var cbrNodeAlreadySelected = {
  id: 'au-act-cbr',
  label: 'Canberra',
  type: 'City',
  ancestors: [actPath, auPath],
  path: [],
  value: 2000,
  rootTypeId: 'a',
  isExpandable: true
};
var maleNode = {
  id: 4,
  label: 'Males',
  type: '',
  path: [],
  value: 500,
  rootTypeId: 'b'
};

var valueFormatter = function valueFormatter(value) {
  return value;
};

var nodeRenderer = function nodeRenderer(value) {
  return "Test value: ".concat(value.label);
};

var initialSelection = [actNode, ntNode];
var itemType = 'example item type';
var TreePickerMocks = immutable({
  actNode: actNode,
  ntNode: ntNode,
  baseItem: baseItem,
  cbrNode: cbrNode,
  cbrNodeAlreadySelected: cbrNodeAlreadySelected,
  initialSelection: initialSelection,
  itemType: itemType,
  maleNode: maleNode,
  nodeRenderer: nodeRenderer,
  qldNode: qldNode,
  saNode: saNode,
  valueFormatter: valueFormatter
});
export default TreePickerMocks;