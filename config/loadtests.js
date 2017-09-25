const modularTestsContext = require.context('../src/components', true, /(\.spec)\.(jsx?)$/);
modularTestsContext.keys().forEach(modularTestsContext);
