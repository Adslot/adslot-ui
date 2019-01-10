import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'adslot-ui/Panel';
import Card from 'alexandria/Card';

const AccordionComponent = ({ dts, panels, onPanelClick }) => (
  <Card.Container>
    <Card.Content fill>
      {_.map(panels, panel => {
        const panelDts = dts ? `panel-${panel.id}` : undefined;
        const panelProps = {
          key: panel.id,
          onClick: onPanelClick,
          dts: panelDts,
          ..._.omit(panel, ['content', 'onClick']),
        };

        return <Panel {...panelProps}>{panel.content}</Panel>;
      })}
    </Card.Content>
  </Card.Container>
);

const accordionPanelPropTypes = _.pick(Panel.propTypes, ['id', 'icon', 'title', 'isCollapsed']);

accordionPanelPropTypes.content = PropTypes.node;

AccordionComponent.propTypes = {
  dts: PropTypes.string,
  panels: PropTypes.arrayOf(PropTypes.shape(accordionPanelPropTypes)).isRequired,
  onPanelClick: PropTypes.func.isRequired,
};

export default AccordionComponent;
