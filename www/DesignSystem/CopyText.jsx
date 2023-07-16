import React from 'react';
import classnames from 'classnames';
import './CopyText.css';

const CopyText = ({ children, className, ...rest }) => {
  const [selected, setSelected] = React.useState();

  const selectContents = () => {
    const el = ref.current;
    setSelected(true);
    let range = document.createRange();
    range.selectNodeContents(el);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const ref = React.useRef();
  return (
    <div
      tabIndex={0}
      ref={ref}
      type="text"
      className={classnames(className, 'copy-text', selected && 'copy-text-selected')}
      onFocus={selectContents}
      onBlur={() => setSelected(false)}
      onMouseUpCapture={() => {
        selectContents();
        ref.current.focus();
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CopyText;
