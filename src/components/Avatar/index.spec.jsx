/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '.';

describe('Avatar', () => {
  it('should render with defaults', () => {
    const component = shallow(<Avatar />);
    expect(component.prop('className')).to.equal('avatar-component');
    expect(component.prop('title')).to.equal(' ');

    const avatarElement = component.find('img');
    expect(avatarElement).to.have.length(0);

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('');
  });

  it('should render with names given', () => {
    const component = shallow(<Avatar givenName="John" surname="Doe" />);
    expect(component.prop('className')).to.equal('avatar-component');
    expect(component.prop('title')).to.equal('John Doe');

    const avatarElement = component.find('img');
    expect(avatarElement).to.have.length(0);

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('JD');
  });

  it('should render with different color', () => {
    const component = shallow(<Avatar givenName="John" surname="Doe" color="blue" />);
    expect(component.prop('className')).to.equal('avatar-component avatar-component-blue');
    expect(component.prop('title')).to.equal('John Doe');

    const avatarElement = component.find('img');
    expect(avatarElement).to.have.length(0);

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('JD');
  });

  it('should render with avatar', () => {
    const component = shallow(<Avatar givenName="John" surname="Doe" image="//avatar.com" />);
    expect(component.prop('className')).to.equal('avatar-component');
    expect(component.prop('title')).to.equal('John Doe');

    const avatarElement = component.find('img');
    expect(avatarElement.prop('className')).to.equal('avatar-component-image');
    expect(avatarElement.prop('src')).to.equal('//avatar.com');

    const initialsElement = component.find('.avatar-component-initials');
    expect(initialsElement.text()).to.equal('JD');
  });

  it('should render with default title of givenName surname', () => {
    const element = shallow(<Avatar color="blue" givenName="Firstname" surname="Surname" />);
    const divContainer = element.find('div.avatar-component').first();
    expect(divContainer.prop('title')).to.equal('Firstname Surname');
  });

  it('should render with custom title property when tooltip with custom text supplied', () => {
    const element = shallow(
      <Avatar color="blue" givenName="Firstname" surname="Surname" tooltip="Name of logged-in user" />
    );
    const divContainer = element.find('div.avatar-component').first();
    expect(divContainer.prop('title')).to.equal('Name of logged-in user');
  });

  it('should render with empty title property when tooltip with empty text supplied', () => {
    const element = shallow(<Avatar color="blue" givenName="Firstname" surname="Surname" tooltip="" />);
    const divContainer = element.find('div.avatar-component').first();
    expect(divContainer.prop('title')).to.equal('');
  });
});
