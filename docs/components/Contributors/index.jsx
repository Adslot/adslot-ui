import React from 'react';
import _ from 'lodash';
import 'isomorphic-fetch';
import { Avatar, Spinner, PageTitle } from '../../../src';

import './styles.scss';

const plural = number => `${number} contribution${number > 1 ? 's' : ''}`;

class Contributors extends React.PureComponent {
  state = {
    contributors: [],
  };

  componentDidMount() {
    this.getContributors();
  }

  getContributors = () => {
    fetch('https://api.github.com/repos/Adslot/adslot-ui/contributors')
      .then(response => response.json())
      .then(contributors => {
        this.setState({ contributors });
      });
  };

  renderContributors = () =>
    _.map(this.state.contributors, (
      { login, avatar_url, contributions } // eslint-disable-line camelcase
    ) => (
      <Avatar
        givenName={login}
        image={avatar_url} // eslint-disable-line camelcase
        key={login}
        tooltip={`Thanks, ${login}, for your ${plural(contributions)}`}
      />
    ));

  render() {
    return (
      <div className="git-contributors">
        <PageTitle title="Contributors">
          {this.state.contributors.length ? (
            <small>
              Thanks to all <strong>{this.state.contributors.length}</strong> of our contributors!
            </small>
          ) : null}
        </PageTitle>
        <div className="avatars-container">
          {this.state.contributors.length ? this.renderContributors() : <Spinner size="medium" />}
        </div>
      </div>
    );
  }
}

export default Contributors;
