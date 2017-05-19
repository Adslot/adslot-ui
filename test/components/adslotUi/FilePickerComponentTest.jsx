import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import React from 'react';
import sinon from 'sinon';
import FilePickerComponent from 'components/adslotUi/FilePickerComponent';
import { mount, shallow } from 'enzyme';

describe('FilePickerComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<FilePickerComponent onSelect={_.noop} />);
    expect(component.prop('className')).to.equal('filepicker-component input-group');

    const fileElement = component.find('.form-control');
    expect(fileElement.prop('placeholder')).to.equal('No file selected');
    expect(fileElement.prop('title')).to.equal('');

    const selectButtonElement = component.find(Button);
    expect(selectButtonElement.children().find('span').text()).to.equal('Select');

    const fileInputElement = component.find('.file-input');
    expect(fileInputElement.prop('type')).to.equal('file');
    expect(fileInputElement.prop('data-test-selector')).to.be.an('undefined');
  });

  it('should show remove button and call `onSelect` when file selected', () => {
    let selectedFileName = '';
    const onSelect = (file) => { selectedFileName = file.name; };

    // mount is needed for refs
    const component = mount(<FilePickerComponent onSelect={onSelect} dts="test-file-picker-input" />);

    expect(component.find('.form-control').prop('title')).to.equal('');

    const fileInput = component.instance().fileInput;
    sinon.spy(fileInput, 'click');
    component.find(Button).simulate('click');
    expect(fileInput.click.calledOnce).to.equal(true);
    fileInput.click.restore();

    component
      .find('[data-test-selector="test-file-picker-input"]')
      .simulate('change', { target: { files: [{ name: 'selected file' }] } });
    component.node.fileInput = {
      files: [{ name: 'selected file' }],
    };
    component.update();
    expect(component.state('isFileSelected')).to.equal(true);

    component
      .find('[data-test-selector="test-file-picker-input"]')
      .simulate('change', { target: { files: [{ name: 'another file' }] } });
    component.node.fileInput = {
      files: [{ name: 'another file' }],
    };
    component.update();
    expect(component.state('isFileSelected')).to.equal(true);

    expect(component.find('.form-control').prop('title')).to.equal('another file');

    expect(selectedFileName).to.equal('another file');

    expect(component.find('.remove-file')).to.have.length(1);
  });

  it('should remove file selected when remove file button is clicked', () => {
    const component = mount(<FilePickerComponent onSelect={_.noop} />);

    component.setState({ isFileSelected: true });
    component.node.fileInput = {
      files: [{ name: 'selected file' }],
    };
    component.update();

    expect(component.find('.form-control').prop('title')).to.equal('selected file');

    component.find('.remove-file').simulate('click');

    expect(component.find('.form-control').prop('title')).to.equal('');
  });

  it('should call `onRemove` when remove file button is clicked', (done) => {
    const component = mount(<FilePickerComponent onSelect={_.noop} onRemove={done} />);

    component.node.fileInput = {
      files: [{ name: 'selected file' }],
    };
    component.update();
    component.setState({ isFileSelected: true });

    component.find('.remove-file').simulate('click');
  });
});
