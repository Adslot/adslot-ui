import React from 'react';
import axios from 'axios';
import { ActionPanel, Avatar, Spinner, Popover, SvgSymbol } from '../../../src';

const plural = number => `${number} contribution${number > 1 ? 's' : ''}`;

const Contributors = () => {
  const [contributors, setContributors] = React.useState([]);
  const getContributors = () => {
    axios
      .get('https://api.github.com/repos/Adslot/adslot-ui/contributors')
      .then(response => response.data)
      .then(data => setContributors(data));
  };

  React.useEffect(getContributors, []);

  const renderContributors = () =>
    contributors.map((
      { login, avatar_url, contributions } // eslint-disable-line camelcase
    ) => (
      <Popover key={login} popoverContent={`Thanks, ${login}, for your ${plural(contributions)}`}>
        <Avatar
          givenName={login}
          image={avatar_url} // eslint-disable-line camelcase
        />
      </Popover>
    ));

  const [showContributors, setShowContributors] = React.useState(false);

  return (
    <React.Fragment>
      <Popover popoverContent="Contributors" placement="bottom" theme="dark">
        <div onClick={() => setShowContributors(true)}>
          <SvgSymbol classSuffixes={['contributors']} href="./assets/svg-symbols.svg#contributors" />
        </div>
      </Popover>
      {showContributors && (
        <ActionPanel
          title={contributors.length !== 0 ? `Thanks to all ${contributors.length} of our contributors!` : 'Loading'}
          className="adslot-ui-contributors-panel"
          isModal
          onClose={() => setShowContributors(false)}
          actionButton={contributors.length !== 0 ? <React.Fragment /> : null}
        >
          {contributors.length !== 0 ? renderContributors() : <Spinner />}
        </ActionPanel>
      )}
    </React.Fragment>
  );
};

export default Contributors;
