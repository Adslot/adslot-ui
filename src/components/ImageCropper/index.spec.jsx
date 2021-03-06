import _ from 'lodash';
import React from 'react';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
import ImageCropper from '.';

afterEach(cleanup);

describe('<ImageCropper />', () => {
  it('should render with props', () => {
    const { getByTestId, queryAllByTestId } = render(
      <ImageCropper src="example.svg" alt="example" onCrop={jest.fn()} onCancel={jest.fn()} width={400} height={400} />
    );
    expect(queryAllByTestId('action-panel-wrapper')).toHaveLength(1);
    expect(getByTestId('action-panel-title')).toHaveTextContent('Image Upload');

    expect(getByTestId('image-cropper')).toHaveStyle('width: 400px; height: 400px;');

    expect(getByTestId('image-cropper-img')).toHaveAttribute('src', 'example.svg');
    expect(getByTestId('image-cropper-img')).toHaveAttribute('alt', 'example');
  });

  it('should call onCrop when user upload button is clicked', () => {
    const onCrop = jest.fn();
    const { queryAllByTestId } = render(<ImageCropper src="example.svg" onCrop={onCrop} onCancel={jest.fn()} />);

    // console.error would be fixed after updating react/react-dom/react-test-renderer to ^16.9.0
    act(() => {
      fireEvent.click(queryAllByTestId('button-wrapper')[1]);
    });

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
        <ImageCropper
          ref={cropperRef}
          src="../../../www/assets/adslot-avatar.png"
          onCrop={_.noop}
          onCancel={_.noop}
          aspectRatio={aspectRatio}
        />
      );
    };

    const { rerender } = render(<TestComponent aspectRatio={2} />);
    act(() => {
      rerender(<TestComponent aspectRatio={3} />);
    });
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
        <ImageCropper
          ref={cropperRef}
          src="../../../www/assets/adslot-avatar.png"
          onCrop={_.noop}
          onCancel={_.noop}
          aspectRatio={aspectRatio}
        />
      );
    };

    const { unmount } = render(<TestComponent />);

    act(() => {
      unmount();
    });

    expect(cropperDestroy).toHaveBeenCalledTimes(1);
  });
});
