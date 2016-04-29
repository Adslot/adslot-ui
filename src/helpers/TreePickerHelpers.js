import _ from 'lodash';

exports.removeSelected = ({ subtree, selectedNodes }) => {
  if (!subtree) return subtree;

  return _(subtree)
    .reject(({ id }) => _.some(selectedNodes, { id }))
    .sortBy('label')
    .value();
};
