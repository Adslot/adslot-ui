import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

if (ADSLOT_TEST_FILE) {
  require(ADSLOT_TEST_FILE);
} else {
  const modularTestsContext = require.context('../src/components', true, /(\.spec)\.(jsx?)$/);
  modularTestsContext.keys().forEach(modularTestsContext);
}
