import * as React from 'react';

export interface FileStickerFile {
  id: string;
  name: string;
  path?: string;
  isUploading?: boolean;
}

export interface FileStickerProps {
  file?: FileStickerFile;
  onFileRemove?: (...args: any[]) => any;
  disabled?: boolean;
}

declare const FileSticker: React.FC<FileStickerProps>;

export default FileSticker;
