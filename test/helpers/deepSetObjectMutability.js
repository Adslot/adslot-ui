import _ from 'lodash';

const deepSet = ({ object, setter, getter }) => {
  Object[setter](object);
  _.forEach(object, (prop) => {
    if (_.isObject(prop) && !Object[getter](prop)) {
      deepSet({ object: prop, setter, getter });
    }
  });
};

exports.deepFreeze = (object) => deepSet({ object, setter: 'freeze', getter: 'isFrozen' });

exports.deepSeal = (object) => deepSet({ object, setter: 'seal', getter: 'isSealed' });
