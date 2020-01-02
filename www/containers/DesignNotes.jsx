import React from 'react';
import PropTypes from 'prop-types';
import { InformationBox } from 'adslot-ui';

function DesignNotes({ children }) {
  return (
    <InformationBox title="Design Notes" className="aui--docs-note-panel">
      {children}
    </InformationBox>
  );
}
DesignNotes.propTypes = {
  children: PropTypes.node,
};
export default DesignNotes;
