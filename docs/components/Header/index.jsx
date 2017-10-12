import React from 'react';
import {
  Button,
  PageTitle,
  SvgSymbol,
} from '../../../src/dist-entry';
import './styles.scss';


export default () => <div className="adslot-ui-header">
  <PageTitle title={<SvgSymbol href="/assets/svg-symbols.svg#logo" />}>
    <small><Button bsStyle="link" href="https://adslot.com">Visit Adslot</Button></small>
    <small><Button bsStyle="link" href="https://github.com/Adslot/adslot-ui">View on GitHub</Button></small>
  </PageTitle>
</div>;
