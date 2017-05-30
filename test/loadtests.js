const testsContext = require.context('.', true, /(Test|Helper)\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);

const modularTestsContext = require.context('../src', true, /(\.spec)\.(js|jsx)$/);
modularTestsContext.keys().forEach(modularTestsContext);
