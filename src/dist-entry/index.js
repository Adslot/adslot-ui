// Webpack chunk entry file for distribution
import _ from 'lodash';

// es6 "import * from" is not used for upsetting coverage because of unknown reason
module.exports = _.assign(require('./core'), require('./extra'));
