import _ from 'lodash';
import React from 'react';
import { render, screen, user } from 'testing';
import ImageCropper from '.';

describe('<ImageCropper />', () => {
  it('should render with props', () => {
    render(
      <ImageCropper src="./test.png" alt="example" onCrop={jest.fn()} onCancel={jest.fn()} width={400} height={400} />
    );
    expect(screen.getByTestId('action-panel-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('action-panel-title')).toHaveTextContent('Image Upload');

    expect(screen.getByTestId('image-cropper')).toHaveStyle('width: 400px; height: 400px;');

    expect(screen.getByTestId('image-cropper-img')).toHaveAttribute('src', './test.png');
    expect(screen.getByTestId('image-cropper-img')).toHaveAttribute('alt', 'example');
  });

  it('should call onCrop when user upload button is clicked', async () => {
    const onCrop = jest.fn();
    render(<ImageCropper src="./test.png" onCrop={onCrop} onCancel={jest.fn()} />);

    await user.click(screen.getAllByTestId('button-wrapper')[1]);
    expect(onCrop).toHaveBeenCalledTimes(1);
  });

  it('should setAspectRatio of cropperRef', () => {
    const setAspectRadio = jest.fn();

    const TestComponent = ({ aspectRatio }) => {
      const cropperRef = React.useRef();
      React.useEffect(() => {
        cropperRef.current.getCropper().current.setAspectRatio = setAspectRadio;
      }, []);
      return (
        <ImageCropper ref={cropperRef} src="./test.png" onCrop={_.noop} onCancel={_.noop} aspectRatio={aspectRatio} />
      );
    };

    const view = render(<TestComponent aspectRatio={2} />);
    view.rerender(<TestComponent aspectRatio={3} />);
    expect(setAspectRadio).toHaveBeenCalledTimes(1);
    expect(setAspectRadio).toHaveBeenCalledWith(3);
  });

  it('should destroy cropperRef if component will unmount', () => {
    const cropperDestroy = jest.fn();
    const TestComponent = ({ aspectRatio }) => {
      const cropperRef = React.useRef();
      React.useEffect(() => {
        cropperRef.current.getCropper().current.destroy = cropperDestroy;
      }, []);
      return (
        <ImageCropper ref={cropperRef} src="./test.png" onCrop={_.noop} onCancel={_.noop} aspectRatio={aspectRatio} />
      );
    };

    const view = render(<TestComponent />);
    view.unmount();
    expect(cropperDestroy).toHaveBeenCalledTimes(1);
  });
});
