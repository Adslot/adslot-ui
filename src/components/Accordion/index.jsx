import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import Panel from '../Panel';
import invariant from '../../invariant';

const Accordion = ({ dts, children, maxExpand, defaultActivePanelIds, onPanelClick }) => {
  const [activePanelIds, setActivePanelIds] = React.useState(() => {
    return maxExpand === 'max' ? defaultActivePanelIds : _.slice(defaultActivePanelIds, 0, maxExpand);
  });

  const onChildPanelClick = (panelId) => {
    if (_.includes(activePanelIds, panelId)) {
      // remove panelId out of the active list
      setActivePanelIds((prevState) => _.without(prevState, panelId));
    } else {
      // drop panels from the beginning if max opened panels count is reached
      setActivePanelIds((prevState) => {
        let newActivePanelIds = [...prevState, panelId];
        if (maxExpand !== 'max' && newActivePanelIds.length > maxExpand) {
          newActivePanelIds = _.drop(newActivePanelIds, newActivePanelIds.length - maxExpand);
        }
        return newActivePanelIds;
      });
    }
    onPanelClick?.(panelId);
  };

  const renderPanelFromChildren = (child) => {
    const { id, isCollapsed } = child.props;

    // prevent rendering if child is not an instance of Accordion.Panel
    if (child.type !== Panel) {
      return null;
    }

    // respects child.props.isCollapsed for controlled behavior
    return React.cloneElement(child, {
      ...child.props,
      onClick: onChildPanelClick,
      isCollapsed: _.isNil(isCollapsed) ? !_.includes(activePanelIds, id) : isCollapsed,
    });
  };

  invariant(
    (_.isNumber(maxExpand) && maxExpand > 0) || (_.isString(maxExpand) && maxExpand === 'max'),
    "maxExpand must be a positive number or 'max'"
  );

  return (
    <Card.Container dts={dts}>
      <Card.Content fill>{React.Children.map(children, renderPanelFromChildren)}</Card.Content>
    </Card.Container>
  );
};

Accordion.propTypes = {
  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: PropTypes.string,
  /**
   * onPanelClick(panelId) takes in a single parameter which is the id of the clicked panel.
   */
  onPanelClick: PropTypes.func,
  /**
   * <span>
   *  Accept an array of <a href="/panel-example">Panel</a> or
   *  <a href="/accordion-panel-example">Accordion.Panel</a>
   *  </span>
   */
  children: PropTypes.node,
  defaultActivePanelIds: PropTypes.arrayOf(PropTypes.string),
  /**
   * Determine how many Panels can be expanded, accepted value is a positive number, or <code>max</code> to have no restriction
   */
  maxExpand: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['max'])]),
};

Accordion.defaultProps = {
  maxExpand: 'max',
  defaultActivePanelIds: [],
};

Accordion.Panel = Panel;
export default Accordion;
