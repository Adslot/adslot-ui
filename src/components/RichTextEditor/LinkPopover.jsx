import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import sanitizeUrl from './sanitizeUrl';
import usePopoverDismiss from './usePopoverDismiss';

const LinkPopover = ({ initialUrl, canRemove, onApply, onRemove, onClose, anchorEl }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [url, setUrl] = useState(initialUrl || '');
  const [error, setError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  usePopoverDismiss({ active: true, containerRef, anchorEl, onClose });

  const handleChange = (event) => {
    setUrl(event.target.value);
    if (error) setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const safe = sanitizeUrl(url);
    if (_.isEqual(safe, '')) {
      setError(true);
      return;
    }
    onApply(safe);
  };

  return (
    <div ref={containerRef} className="aui--editor-popover-form" data-testid="link-popover">
      <form onSubmit={handleSubmit} noValidate>
        <div className="aui--editor-popover-row">
          <label className="aui--editor-popover-label" htmlFor="aui-link-url">
            URL
          </label>
          <input
            ref={inputRef}
            id="aui-link-url"
            data-testid="link-url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={handleChange}
            aria-invalid={error}
          />
        </div>
        {error && (
          <div className="aui--editor-popover-error" data-testid="link-error">
            Enter an http, https, or mailto URL.
          </div>
        )}
        <div className="aui--editor-popover-actions">
          <button type="button" data-testid="link-cancel" onClick={onClose}>
            Cancel
          </button>
          {canRemove && (
            <button type="button" data-testid="link-remove" onClick={onRemove}>
              Remove link
            </button>
          )}
          <button type="submit" data-testid="link-submit">
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

LinkPopover.propTypes = {
  initialUrl: PropTypes.string,
  canRemove: PropTypes.bool,
  onApply: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(HTMLElement),
};

export default LinkPopover;
