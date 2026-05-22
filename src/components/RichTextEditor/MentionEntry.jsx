import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Avatar from '../Avatar';

const MentionEntry = ({ mention: { name, title, avatar }, isFocused, setRefElement, ...props }) => {
  const nameParts = name.split(' ');
  const givenName = _.head(nameParts);
  const surname = nameParts.length > 1 ? _.last(nameParts) : '';

  return (
    <div
      ref={setRefElement}
      role="option"
      aria-selected={isFocused}
      data-testid="rich-text-editor-mention-entry"
      className={classnames('aui--mention-entry', { 'aui--mention-entry__is-focused': isFocused })}
      {..._.pick(props, ['onClick', 'onMouseDown', 'onMouseEnter'])}
    >
      <div className="mention-entry--container">
        <div className="mention-entry--container__left">
          <Avatar givenName={givenName} surname={surname} image={avatar} />
        </div>
        <div className="mention-entry--container__right">
          <div className="mention-entry--name">{name}</div>
          <div className="mention-entry--title">{title}</div>
        </div>
      </div>
    </div>
  );
};

MentionEntry.propTypes = {
  mention: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  isFocused: PropTypes.bool,
  setRefElement: PropTypes.func,
};

export default MentionEntry;
