import _ from 'lodash';

exports.removeSelected = ({ subtree, selectedNodes }) => {
  if (!subtree) return subtree;

  return _.reject(subtree, ({ id }) => _.some(selectedNodes, { id }));
};
