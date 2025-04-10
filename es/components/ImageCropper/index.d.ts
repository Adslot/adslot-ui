import * as React from 'react';
import type Cropper from 'cropperjs';

export interface ImageCropperProps {
  title?: string;
  src: string;
  alt?: string;
  onCrop: (data: Cropper.Data) => any;
  onCancel: (...args: any[]) => any;
  width?: number;
  height?: number;
  aspectRatio?: number;
  isSaving?: boolean;
  dts?: string;
}

declare const ImageCropper: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ImageCropperProps> & React.RefAttributes<((...args: any[]) => any) | Element>
>;

export default ImageCropper;
