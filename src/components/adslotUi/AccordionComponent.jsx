import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'components/adslotUi/PanelComponent';
import Card from 'components/alexandria/Card';

const AccordionComponent = ({ dts, panels, onPanelClick }) => (
  <Card.Container>
    <Card.Content fill>
      {_.map(panels, (panel) => {
        const panelDts = dts ? `panel-${panel.id}` : undefined;

        return (
          <Panel
            key={panel.id}
            id={panel.id}
            icon={panel.icon}
            title={panel.title}
            isCollapsed={panel.isCollapsed}
            onClick={onPanelClick}
            dts={panelDts}
          >
            {panel.content}
          </Panel>
        );
      })}
    </Card.Content>
  </Card.Container>
);

const accordionPanelPropTypes = _.pick(Panel.propTypes, [
  'id',
  'icon',
  'title',
  'isCollapsed',
]);

accordionPanelPropTypes.content = PropTypes.node;

AccordionComponent.propTypes = {
  dts: PropTypes.string,
  panels: PropTypes.arrayOf(PropTypes.shape(accordionPanelPropTypes)).isRequired,
  onPanelClick: PropTypes.func.isRequired,
};

export default AccordionComponent;
