import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
const MentionEntry = (_ref // internal props used by mention plugin
) => {
  let {
    mention: {
      name,
      title,
      avatar
    },
    ...props
  } = _ref;
  const fullName = name.split(' ');
  const givenName = fullName[0];
  const surname = fullName.length > 1 ? fullName[fullName.length - 1] : '';
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classnames(['aui--mention-entry', {
      'aui--mention-entry__is-focused': props.isFocused
    }])
  }, _.pick(props, ['onMouseDown', 'onMouseUp', 'onMouseEnter'])), /*#__PURE__*/React.createElement("div", {
    className: "mention-entry--container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mention-entry--container__left"
  }, /*#__PURE__*/React.createElement(Avatar, {
    givenName: givenName,
    surname: surname,
    image: avatar
  })), /*#__PURE__*/React.createElement("div", {
    className: "mention-entry--container__right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mention-entry--name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "mention-entry--title"
  }, title))));
};
export default MentionEntry;
MentionEntry.propTypes = {
  className: PropTypes.string,
  mention: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string
  }),
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  isFocused: PropTypes.bool
};