import React from 'react';
import { ActionPanel, Avatar, Spinner, Popover, SvgSymbol } from '../src';
import './Header.css';

const plural = (number) => `${number} contribution${number > 1 ? 's' : ''}`;

const Contributors = () => {
  const [contributors, setContributors] = React.useState([]);

  React.useEffect(() => {
    const getContributors = async () => {
      const data = await fetch('https://api.github.com/repos/Adslot/adslot-ui/contributors');
      const c = await data.json();
      setContributors(c);
    };
    getContributors();
  }, []);

  const renderContributors = () =>
    contributors.map(({ login, avatar_url, contributions }) => (
      <Popover key={login} popoverContent={`Thanks, ${login}, for your ${plural(contributions)}`}>
        <Avatar givenName={login} image={avatar_url} />
      </Popover>
    ));

  const [showContributors, setShowContributors] = React.useState(false);

  return (
    <React.Fragment>
      <Popover popoverContent="Contributors" placement="bottom" theme="dark">
        <div onClick={() => setShowContributors(true)}>
          <SvgSymbol classSuffixes={['contributors']} href="/svg-symbols.svg#contributors" />
        </div>
      </Popover>
      {showContributors && (
        <ActionPanel
          title={contributors.length !== 0 ? `Thanks to all ${contributors.length} of our contributors!` : 'Loading'}
          className="adslot-ui-contributors-panel"
          isModal
          onClose={() => setShowContributors(false)}
        >
          {contributors.length !== 0 ? renderContributors() : <Spinner />}
        </ActionPanel>
      )}
    </React.Fragment>
  );
};

const Header = () => (
  <div className="adslot-ui-header">
    <div className="header-right-pane">
      <img src="https://badge.fury.io/js/adslot-ui.svg" alt="badge" />
      <Popover popoverContent="Visit Adslot" placement="bottom" theme="dark">
        <a href="https://adslot.com">
          <img src="/adslot-avatar.png" className="adslot-icon" alt="icon" />
        </a>
      </Popover>
      <Contributors />
      <Popover popoverContent="Github" placement="bottom" theme="dark">
        <a href="https://github.com/Adslot/adslot-ui">
          <img src="/github.png" alt="github" />
        </a>
      </Popover>
    </div>
  </div>
);

export default Header;
