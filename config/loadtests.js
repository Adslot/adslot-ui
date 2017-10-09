if (ADSLOT_TEST_FILE) {
  require(ADSLOT_TEST_FILE);
} else {
  const modularTestsContext = require.context('../src/components', true, /(\.spec)\.(jsx?)$/);
  modularTestsContext.keys().forEach(modularTestsContext);
}
