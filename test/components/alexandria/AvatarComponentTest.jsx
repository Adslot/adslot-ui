import AvatarComponent from 'components/alexandria/AvatarComponent';
import { shallow } from 'enzyme';
import React from 'react';

describe('AvatarComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<AvatarComponent />);
    expect(component.prop('className')).to.equal('avatar-component');
    expect(component.prop('title')).to.equal(' ');

    const avatarElement = component.find('img');
    expect(avatarElement).to.have.length(0);

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('');
  });

  it('should render with names given', () => {
    const component = shallow(<AvatarComponent givenName="John" surname="Doe" />);
    expect(component.prop('className')).to.equal('avatar-component');
    expect(component.prop('title')).to.equal('John Doe');

    const avatarElement = component.find('img');
    expect(avatarElement).to.have.length(0);

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('JD');
  });

  it('should render with different color', () => {
    const component = shallow(<AvatarComponent givenName="John" surname="Doe" color="blue" />);
    expect(component.prop('className')).to.equal('avatar-component avatar-component-blue');
    expect(component.prop('title')).to.equal('John Doe');

    const avatarElement = component.find('img');
    expect(avatarElement).to.have.length(0);

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('JD');
  });

  it('should render with avatar', () => {
    const component = shallow(<AvatarComponent givenName="John" surname="Doe" image="//avatar.com" />);
    expect(component.prop('className')).to.equal('avatar-component');
    expect(component.prop('title')).to.equal('John Doe');

    const avatarElement = component.find('img');
    expect(avatarElement.prop('className')).to.equal('avatar-component-image');
    expect(avatarElement.prop('src')).to.equal('//avatar.com');

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('JD');
  });
});
