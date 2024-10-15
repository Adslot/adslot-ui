import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const FileSticker = ({ onFileRemove, file, disabled }) => {
  const [showClose, setShowClose] = React.useState(false);
  const { name, path, isUploading } = file;
  const isImage = /\.(jpe?g|png)$/i.test(name);

  const onStickerRemove = () => {
    onFileRemove(file);
  };

  return (
    <div
      data-testid="file-sticker"
      className="aui--file-sticker"
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => setShowClose(false)}
    >
      {isImage && !isUploading ? (
        <img data-testid="file-sticker-image" className="aui--file-sticker-image" src={path} alt="" />
      ) : (
        <div className="aui--file-sticker-file">
          <div className="aui--file-sticker-file-icon" />
          <div className="aui--file-sticker-file-name">{name}</div>
        </div>
      )}
      {showClose && (
        <input
          className="aui--file-sticker-close-button"
          data-testid="file-sticker-close-button"
          onClick={onStickerRemove}
          role="button"
          disabled={disabled}
        />
      )}
      {isUploading && <Spinner className="aui--file-sticker-spinner" size="small" />}
    </div>
  );
};

export default FileSticker;

FileSticker.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    isUploading: PropTypes.bool,
  }),
  onFileRemove: PropTypes.func,
  disabled: PropTypes.bool,
};
