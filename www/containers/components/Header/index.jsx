import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle, Popover } from '../../../../src';
import './styles.css';

import Contributors from './Contributors';

const HeaderGraphics = () => (
  <span>
    <Link to="/" className="header-link">
      Adslot UI.
    </Link>
  </span>
);

export default () => (
  <div className="adslot-ui-header">
    <PageTitle title={<HeaderGraphics />}>
      <div className="header-right-pane">
        <img src="https://badge.fury.io/js/adslot-ui.svg" alt="badge" />
        <Popover popoverContent="Visit Adslot" placement="bottom" theme="dark">
          <a href="https://adslot.com">
            <img src="./assets/adslot-avatar.png" className="adslot-icon" alt="icon" />
          </a>
        </Popover>
        <Contributors />
        <Popover popoverContent="Github" placement="bottom" theme="dark">
          <a href="https://github.com/Adslot/adslot-ui">
            <img src="./assets/github.png" alt="github" />
          </a>
        </Popover>
      </div>
    </PageTitle>
  </div>
);
