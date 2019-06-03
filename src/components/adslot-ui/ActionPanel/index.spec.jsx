import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import { ActionPanel } from 'adslot-ui';
import Button from 'react-bootstrap/lib/Button';

describe('ActionPanelComponent', () => {
  const makeProps = override =>
    _.merge(
      {
        title: 'Action Panel',
        size: 'small',
        onClose: _.noop,
        children: <div>content</div>,
      },
      override
    );

  it('should render with defaults', () => {
    const wrapper = shallow(<ActionPanel {...makeProps()} />);
    const headerElement = wrapper.find('.aui--action-panel-header');
    expect(headerElement).to.have.length(1);
    expect(headerElement.find('.title').text()).to.equal('Action Panel');

    const bodyElement = wrapper.find('.aui--action-panel-body');
    expect(bodyElement).to.have.length(1);
  });

  it('should render as a modal', () => {
    const wrapper = shallow(
      <ActionPanel {...makeProps({ isModal: true, size: 'large', actionButton: <Button>Action</Button> })} />
    );
    expect(wrapper.prop('className')).to.equal('aui--action-panel-wrapper aui--action-panel-wrapper-backdrop');

    const actionPanelElement = wrapper.find('.aui--action-panel');
    expect(actionPanelElement.prop('className')).to.equal('aui--action-panel is-large action-modal');
  });
});
