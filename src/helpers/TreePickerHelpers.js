import _ from 'lodash';

exports.removeSelected = ({ subtree, selectedNodes }) =>
  _(subtree)
    .reject(({ id }) => _.some(selectedNodes, { id }))
    .sortBy('label')
    .value();
