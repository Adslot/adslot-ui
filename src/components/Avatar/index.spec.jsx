import React from 'react';
import { render, screen } from 'testing';
import Avatar from '.';

describe('<Avatar />', () => {
  it('should render with defaults', () => {
    render(<Avatar />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass('avatar-component');
    expect(screen.getByTestId('avatar-wrapper')).toHaveAttribute('title', ' ');
    expect(screen.queryByTestId('avatar-image')).not.toBeInTheDocument();
    expect(screen.getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(screen.getByTestId('avatar-initials')).toHaveTextContent('');
  });

  it('should render with names given', () => {
    render(<Avatar givenName="John" surname="Doe" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass('avatar-component');
    expect(screen.getByTestId('avatar-wrapper')).toHaveAttribute('title', 'John Doe');
    expect(screen.queryByTestId('avatar-image')).not.toBeInTheDocument();
    expect(screen.getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(screen.getByTestId('avatar-initials')).toHaveTextContent('JD');
  });

  it('should render with different color', () => {
    render(<Avatar givenName="John" surname="Doe" color="blue" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass('avatar-component avatar-component-blue');
    expect(screen.getByTestId('avatar-wrapper')).toHaveAttribute('title', 'John Doe');
    expect(screen.queryByTestId('avatar-image')).not.toBeInTheDocument();
    expect(screen.getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(screen.getByTestId('avatar-initials')).toHaveTextContent('JD');
  });

  it('should render with avatar', () => {
    render(<Avatar givenName="John" surname="Doe" image="//avatar.com" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveClass('avatar-component');
    expect(screen.getByTestId('avatar-wrapper')).toHaveAttribute('title', 'John Doe');
    expect(screen.getByTestId('avatar-image')).toHaveClass('avatar-component-image');
    expect(screen.getByTestId('avatar-image')).toHaveAttribute('src', '//avatar.com');
    expect(screen.getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(screen.getByTestId('avatar-initials')).toHaveTextContent('JD');
  });

  it('should render with default title of givenName surname', () => {
    render(<Avatar color="blue" givenName="Firstname" surname="Surname" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveAttribute('title', 'Firstname Surname');
  });

  it('should render with custom title property when tooltip with custom text supplied', () => {
    render(<Avatar color="blue" givenName="Firstname" surname="Surname" tooltip="Name of logged-in user" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveAttribute('title', 'Name of logged-in user');
  });

  it('should render with empty title property when tooltip with empty text supplied', () => {
    render(<Avatar color="blue" givenName="Firstname" surname="Surname" tooltip="" />);
    expect(screen.getByTestId('avatar-wrapper')).toHaveAttribute('title', '');
  });
});
