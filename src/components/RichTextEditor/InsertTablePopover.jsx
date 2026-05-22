import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import usePopoverDismiss from './usePopoverDismiss';

const MAX_ROWS = 20;
const MAX_COLUMNS = 10;
const DEFAULT_ROWS = 3;
const DEFAULT_COLUMNS = 3;

const InsertTablePopover = ({ onInsert, onClose, anchorEl }) => {
  const containerRef = useRef(null);
  const rowsInputRef = useRef(null);
  const [rows, setRows] = useState(String(DEFAULT_ROWS));
  const [columns, setColumns] = useState(String(DEFAULT_COLUMNS));

  useEffect(() => {
    rowsInputRef.current.focus();
    rowsInputRef.current.select();
  }, []);

  usePopoverDismiss({ active: true, containerRef, anchorEl, onClose });

  const handleSubmit = (event) => {
    event.preventDefault();
    const safeRows = _.clamp(Math.floor(Number(rows)) || DEFAULT_ROWS, 1, MAX_ROWS);
    const safeColumns = _.clamp(Math.floor(Number(columns)) || DEFAULT_COLUMNS, 1, MAX_COLUMNS);
    onInsert({ rows: safeRows, columns: safeColumns });
  };

  return (
    <div ref={containerRef} className="aui--editor-popover-form" data-testid="insert-table-popover">
      <form onSubmit={handleSubmit} noValidate>
        <div className="aui--editor-popover-row">
          <label className="aui--editor-popover-label" htmlFor="aui-insert-table-rows">
            Rows
          </label>
          <input
            ref={rowsInputRef}
            id="aui-insert-table-rows"
            data-testid="insert-table-rows"
            type="number"
            min="1"
            max={MAX_ROWS}
            value={rows}
            onChange={(event) => setRows(event.target.value)}
          />
        </div>
        <div className="aui--editor-popover-row">
          <label className="aui--editor-popover-label" htmlFor="aui-insert-table-columns">
            Columns
          </label>
          <input
            id="aui-insert-table-columns"
            data-testid="insert-table-columns"
            type="number"
            min="1"
            max={MAX_COLUMNS}
            value={columns}
            onChange={(event) => setColumns(event.target.value)}
          />
        </div>
        <div className="aui--editor-popover-actions">
          <button type="button" data-testid="insert-table-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" data-testid="insert-table-submit">
            Insert
          </button>
        </div>
      </form>
    </div>
  );
};

InsertTablePopover.propTypes = {
  onInsert: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(HTMLElement),
};

export default InsertTablePopover;
