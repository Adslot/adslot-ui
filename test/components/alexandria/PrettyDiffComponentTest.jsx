import PrettyDiffComponent from 'components/alexandria/PrettyDiffComponent';
import { shallow } from 'enzyme';
import React from 'react';

describe('PrettyDiffComponent', () => {
  const diffStrings = [
    '<the quick fox>',
    '<the slow fox jumped>',
  ];

  it('should render with spans having different classes', () => {
    const component = shallow(<PrettyDiffComponent newText={diffStrings[1]} oldText={diffStrings[0]} />);
    expect(component.prop('className')).to.equal('pretty-diff-component');

    const equalSpans = component.find('.pretty-diff-component-equal');
    expect(equalSpans).to.have.length(3);
    expect(equalSpans.first().text()).to.equal('<the ');
    expect(equalSpans.at(1).text()).to.equal(' fox');
    expect(equalSpans.last().text()).to.equal('>');

    const deleteSpans = component.find('.pretty-diff-component-delete');
    expect(deleteSpans).to.have.length(1);
    expect(deleteSpans.first().text()).to.equal('quick');

    const insertSpans = component.find('.pretty-diff-component-insert');
    expect(insertSpans).to.have.length(2);
    expect(insertSpans.first().text()).to.equal('slow');
    expect(insertSpans.last().text()).to.equal(' jumped');
  });
});
