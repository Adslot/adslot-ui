import React from 'react';
import FileUploadComponent from 'components/adslotUi/FileUploadComponent.js';
import { shallow } from 'enzyme';

const baseClass = 'fileupload-component';
let fileDataRes = null;

const setFileData = (fileData) => {
  fileDataRes = fileData;
};

describe('FileUploadComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<FileUploadComponent setFileData={setFileData} />);
    expect(fileDataRes).to.equal(null);
    const divElement = component.find('div').first();
    expect(divElement.prop('className')).to.equal(`${baseClass} input-group`);
    const inputElement = divElement.find('input').first();
    expect(inputElement.prop('placeholder')).to.equal('No file selected');

    // expect(component.prop('placeholder')).to.equal('No file selected');
    // expect(component.prop('btnUploadText')).to.equal('Select');
    // expect(component.prop('disabledUploadBtn')).to.equal(false);
    // expect(component.prop('isHighlight')).to.equal(false);
  });
});
