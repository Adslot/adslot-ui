import React from 'react';
import { shallow } from 'enzyme';
import CountBadge from '.';

describe('CountBadge', () => {
  it('should render with defaults', () => {
    const component = shallow(<CountBadge value={1} dts="count-badge-one" />);
    expect(component.find('[data-test-selector="count-badge-one"]').text()).to.equal('1');
    expect(component.hasClass('status-default')).to.equal(true);
    expect(component.hasClass('count-badge-font-size-normal')).to.equal(true);
  });

  it('should render with status info', () => {
    const component = shallow(<CountBadge value={2} dts="count-badge-two" status="info" />);
    expect(component.hasClass('status-info')).to.equal(true);
  });

  it('should render with status warning', () => {
    const component = shallow(<CountBadge value={2} dts="count-badge-three" status="warning" />);
    expect(component.hasClass('status-warning')).to.equal(true);
  });

  it('should render with status danger', () => {
    const component = shallow(<CountBadge value={2} dts="count-badge-four" status="danger" />);
    expect(component.hasClass('status-danger')).to.equal(true);
  });

  it('should render with a smaller font size if the value is greater than 99', () => {
    const component = shallow(<CountBadge value={100} dts="count-badge-five" status="info" />);
    expect(component.hasClass('count-badge-font-size-small')).to.equal(true);
  });
});
