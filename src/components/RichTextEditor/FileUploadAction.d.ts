import * as React from 'react';

export interface FileUploadActionProps {
  onFileUpload?: (...args: any[]) => any;
  fileFilter?: string;
  disabled?: boolean;
}

declare const FileUploadAction: React.FC<FileUploadActionProps>;

export default FileUploadAction;
