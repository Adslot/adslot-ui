import _ from 'lodash';
import React from 'react';
import FilePickerComponent from 'components/adslotUi/FilePickerComponent.js';
import { shallow } from 'enzyme';

describe('FilePickerComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<FilePickerComponent onSelect={_.noop} />);
    expect(component.prop('className')).to.equal('filepicker-component input-group');

    const fileElement = component.find('.form-control');
    expect(fileElement.prop('placeholder')).to.equal('No file selected');
    expect(fileElement.prop('title')).to.equal('');

    const fileInputElement = component.find('.file-input');
    expect(fileInputElement.prop('type')).to.equal('file');
  });

  it('should show remove button and call `onSelect` when file selected', () => {
    let onSelectCalls = 0;
    const onSelect = () => { onSelectCalls++; };

    const component = shallow(<FilePickerComponent onSelect={onSelect} />);
    let fileElement = component.find('.form-control');
    expect(fileElement.prop('title')).to.equal('');

    const fileInputElement = component.find('.file-input');
    fileInputElement.simulate('change', { target: { files: [{ name: 'selected file' }] } });
    expect(component.state('fileName')).to.equal('selected file');

    fileElement = component.find('.form-control');
    expect(fileElement.prop('title')).to.equal('selected file');

    const removeElement = component.find('.remove-file');
    expect(removeElement).to.have.length(1);

    expect(onSelectCalls).to.equal(1);
  });

  it('should remove file selected when remove file button is clicked', () => {
    const component = shallow(<FilePickerComponent onSelect={_.noop} />);
    component.setState({ fileName: 'selected file' });
    let fileElement = component.find('.form-control');
    expect(fileElement.prop('title')).to.equal('selected file');

    const removeElement = component.find('.remove-file');
    removeElement.simulate('click');

    fileElement = component.find('.form-control');
    expect(fileElement.prop('title')).to.equal('');
  });

  it('should call `onRemove` when remove file button is clicked', (done) => {
    const component = shallow(<FilePickerComponent onSelect={_.noop} onRemove={done} />);
    component.setState({ fileName: 'selected file' });
    const removeElement = component.find('.remove-file');
    removeElement.simulate('click');
  });
});
