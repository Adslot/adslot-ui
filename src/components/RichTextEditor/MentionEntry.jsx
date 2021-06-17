import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

const MentionEntry = (
  { mention: { name, title, avatar }, ...props } // internal props used by mention plugin
) => {
  const fullName = name.split(' ');
  const givenName = fullName[0];
  const surname = fullName.length > 1 ? fullName[fullName.length - 1] : '';

  return (
    <div
      className={classnames(['aui--mention-entry', { 'aui--mention-entry__is-focused': props.isFocused }])}
      data-testid="rich-text-editor-mention-entry"
      {..._.pick(props, ['onMouseDown', 'onMouseUp', 'onMouseEnter'])}
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

export default MentionEntry;

MentionEntry.propTypes = {
  className: PropTypes.string,
  mention: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  isFocused: PropTypes.bool,
};
