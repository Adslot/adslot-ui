import React, { useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import Button from '../Button';
import ActionPanel from '../ActionPanel';
import './styles.scss';

// https://github.com/fengyuanchen/cropperjs/blob/v2/README.md
const defaultOptions = {
  dragMode: 'move',
  viewMode: 2,
  guides: false,
  movable: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: false,
};

const ImageCropper = forwardRef(({ title, src, alt, onCancel, onCrop, width, height, aspectRatio, isSaving }, ref) => {
  const cropperRef = React.useRef();
  const imageRef = React.useRef();

  React.useEffect(() => {
    if (!cropperRef.current) return;
    cropperRef.current.setAspectRatio(aspectRatio);
  }, [cropperRef, aspectRatio]);

  React.useEffect(() => {
    cropperRef.current = new Cropper(imageRef.current, {
      aspectRatio,
      ...defaultOptions,
    });

    return () => {
      cropperRef.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    getCropper: () => cropperRef,
  }));

  const uploadButton = (
    <Button bsStyle="primary" onClick={() => onCrop(cropperRef.current.getData())} isLoading={isSaving} inverse>
      Upload
    </Button>
  );

  return (
    <ActionPanel title={title} onClose={onCancel} actionButton={uploadButton}>
      <div className="image-cropper" style={{ width: width || '100%', height: height || '100%' }}>
        <img src={src} ref={imageRef} alt={alt} />
      </div>
    </ActionPanel>
  );
});

ImageCropper.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onCrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  aspectRatio: PropTypes.number,
  isSaving: PropTypes.bool,
};

ImageCropper.defaultProps = {
  title: 'Image Upload',
  isSaving: false,
};

ImageCropper.displayName = 'ImageCropper';

export default ImageCropper;