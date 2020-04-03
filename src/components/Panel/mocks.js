import _ from 'lodash';
import immutable from 'seamless-immutable';

const panel1 = {
  id: '1',
  title: 'Panel 1',
  dts: 'panel-1',
  onClick: _.noop,
};

const panel2 = {
  id: '2',
  title: 'Panel 2',
  isCollapsed: true,
  onClick: _.noop,
  content: 'Panel 2 content',
  dts: 'panel-two',
};

const panel3 = {
  id: '3',
  title: 'Panel 3',
  isCollapsed: true,
  className: 'test-class-1 test-class-2',
  onClick: _.noop,
  content: 'Panel 3 content',
  dts: 'panel-3',
};

const PanelMocks = immutable({
  panel1,
  panel2,
  panel3,
});

export default PanelMocks;
