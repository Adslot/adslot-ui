import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';
import React from 'react';
import ImageCropper from '.';
import ActionPanel from '../ActionPanel';
import Button from '../Button';

describe('ImageCropperComponent', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render with props', () => {
    const component = shallow(
      <ImageCropper
        src="example.svg"
        alt="example"
        onCrop={_.noop}
        onCancel={_.noop}
        width={400}
        height={400}
        aspectRatio={5 / 2}
      />
    );
    expect(component.find(ActionPanel).prop('title')).to.equal('Image Upload');

    const imageCropper = component.find('.image-cropper');
    expect(imageCropper.prop('style')).to.eql({
      width: 400,
      height: 400,
    });
    expect(imageCropper.find('img').prop('src')).to.equal('example.svg');
    expect(imageCropper.find('img').prop('alt')).to.equal('example');
  });

  it('should call onCrop when user upload button is clicked', () => {
    const onCrop = sandbox.stub().resolves();
    const component = mount(<ImageCropper src="example.svg" onCrop={onCrop} onCancel={_.noop} />);
    const uploadButton = component.find(Button);
    uploadButton.simulate('click');
    expect(onCrop.calledOnce).to.equal(true);
  });

  it('should destroy cropperRef if component will unmount', () => {
    const setStateSpy = sandbox.spy();
    sandbox.stub(React, 'useState').callsFake(init => [init, setStateSpy]);
    const component = mount(<ImageCropper src="example.svg" onCrop={_.noop} onCancel={_.noop} />);
    component.unmount();
    expect(setStateSpy.calledOnceWith(false)).to.equal(true);
  });

  it('should set correct aspect ratio on cropper', () => {
    const spySetAspectRatio = sandbox.spy();
    const TestComponent = ({ aspectRatio }) => {
      const cropperRef = React.useRef();
      React.useEffect(() => {
        const newAspectRatio = cropperRef.current.getCropper().current.options.aspectRatio;
        spySetAspectRatio(newAspectRatio);
      }, [aspectRatio]);
      return (
        <ImageCropper
          ref={cropperRef}
          src="../../../www/assets/adslot-avatar.png"
          onCrop={_.noop}
          onCancel={_.noop}
          aspectRatio={aspectRatio}
        />
      );
    };
    const component = mount(<TestComponent aspectRatio={5 / 2} />);
    expect(spySetAspectRatio.args[0][0]).to.equal(5 / 2);

    component.setProps({ aspectRatio: 4 / 2 });
    component.update();
    expect(spySetAspectRatio.args[1][0]).to.equal(4 / 2);
  });
});
