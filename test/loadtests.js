const testsContext = require.context('.', true, /(Test|Helper)\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);
