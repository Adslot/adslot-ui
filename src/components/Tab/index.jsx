/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Tab = ({ children, show }) => (
  <div role="tabpanel" aria-hidden={show} className={classnames(['tab-pane', 'fade', { active: show, in: show }])}>
    {children}
  </div>
);

Tab.innerName = 'au_tab';

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.node.isRequired,
  tabClassName: PropTypes.string,
  disabled: PropTypes.bool,
  show: PropTypes.bool,
};

export default Tab;
