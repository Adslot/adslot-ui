import { shallow } from 'enzyme';
import React from 'react';
import Tab from '.';

describe('<Tab />', () => {
  it('should render with props', () => {
    expect(
      shallow(
        <Tab eventKey="first" show={false} title="First">
          hi
        </Tab>
      ).props().className
    ).to.equal('tab-pane fade');
    expect(
      shallow(
        <Tab eventKey="first" show title="First">
          hi
        </Tab>
      ).props().className
    ).to.equal('tab-pane fade active in');
  });
});
