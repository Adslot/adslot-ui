import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import React from 'react';
import sinon from 'sinon';
import FilePickerComponent from 'adslot-ui/FilePicker';
import { shallow, mount } from 'enzyme';

describe('FilePickerComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<FilePickerComponent onSelect={_.noop} />);
    expect(component.prop('className')).to.equal('filepicker-component input-group');

    const fileElement = component.find('.form-control');
    expect(fileElement.prop('placeholder')).to.equal('No file selected');
    expect(fileElement.prop('title')).to.equal('');

    const selectButtonElement = component.find(Button);
    expect(
      selectButtonElement
        .children()
        .find('span')
        .text()
    ).to.equal('Select');

    const fileInputElement = component.find('.file-input');
    expect(fileInputElement.prop('type')).to.equal('file');
    expect(fileInputElement.prop('data-test-selector')).to.be.an('undefined');
  });

  it('should show remove button and call `onSelect` when file selected', () => {
    const onSelect = sinon.spy();

    // mount is needed for refs
    const component = mount(<FilePickerComponent onSelect={onSelect} dts="test-file-picker-input" />);

    expect(component.find('.form-control').prop('title')).to.equal('');
    expect(component.state('isFileSelected')).to.equal(false);
    expect(component.find('button.remove-file')).to.have.length(0);

    const fileInput = component.find('[data-test-selector="test-file-picker-input"]');

    expect(component.find('.form-control').prop('placeholder')).to.equal('No file selected');
    fileInput.simulate('change', { target: { files: [{ name: 'selected file' }] } });

    expect(component.state('isFileSelected')).to.equal(true);
    expect(onSelect.calledWith({ name: 'selected file' })).to.equal(true);
    expect(component.find('button.remove-file')).to.have.length(1);
    expect(component.find('.form-control').prop('title')).to.equal('selected file');
  });

  it('should trigger click event on file input when button is clicked', () => {
    const component = mount(<FilePickerComponent onSelect={_.noop} />);
    const spy = sinon.spy();
    component.instance().fileInput.addEventListener('click', spy, {
      passive: true,
      once: true,
    });
    component.find(Button).simulate('click');
    expect(spy.callCount).to.equal(1);
  });

  it('onChange() should do nothing if isFileSelected is true', () => {
    const component = mount(<FilePickerComponent onSelect={_.noop} />);
    expect(component.setState({ isFileSelected: true }));
    sinon.spy(component, 'setState');
    component.instance().onChange();
    expect(component.setState.called).to.equal(false);
  });

  it('removeFile() should do nothing if isFileSelected is false', () => {
    const component = mount(<FilePickerComponent onSelect={_.noop} />);
    expect(component.state('isFileSelected')).to.equal(false);
    sinon.spy(component, 'setState');
    component.instance().removeFile();
    expect(component.setState.called).to.equal(false);
  });

  it('should remove file selected when remove file button is clicked', () => {
    const component = mount(<FilePickerComponent onSelect={_.noop} />);

    component.setState({ isFileSelected: true, fileName: 'selected file' });
    component.update();

    expect(component.find('.form-control').prop('title')).to.equal('selected file');

    component.find('button.remove-file').simulate('click');

    expect(component.find('.form-control').prop('title')).to.equal('');
  });

  it('should call `onRemove` when remove file button is clicked', done => {
    const component = mount(<FilePickerComponent onSelect={_.noop} onRemove={done} />);

    component.instance().fileInput = {
      files: [{ name: 'selected file' }],
    };
    component.update();
    component.setState({ isFileSelected: true });

    component.find('button.remove-file').simulate('click');
  });
});
