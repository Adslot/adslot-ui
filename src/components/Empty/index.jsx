import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Empty = ({ collection, text, icon }) => {
  if (_.isEmpty(collection)) {
    return (
      <div data-testid="empty-wrapper" className="empty-component">
        {icon}
        <div data-testid="empty-text" className="empty-component-text">
          {text}
        </div>
      </div>
    );
  }

  return <div data-testid="empty-wrapper" />;
};

Empty.displayName = 'EmptyComponent';

Empty.propTypes = {
  collection: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  text: PropTypes.node, // can be string or, if you want rich formatting, a node
  icon: PropTypes.node,
};

Empty.defaultProps = {
  text: 'Nothing to show.',
};

export default Empty;
