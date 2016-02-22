const testsContext = require.context('.', true, /(Test\.js$)|(Helper\.js$)/);
testsContext.keys().forEach(testsContext); // eslint-disable-line lodash/prefer-lodash-method
