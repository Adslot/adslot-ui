import React from 'react';
import _ from 'lodash';
import {
  Avatar,
  Spinner,
  PageTitle,
} from '../../../src/dist-entry';

import './styles.scss';

class Contributors extends React.Component {
  constructor() {
    super();
    this.state = { contributors: [] };
    this.renderContributors = this.renderContributors.bind(this);

    this.getContributors();
  }

  getContributors() {
    fetch('https://api.github.com/repos/Adslot/adslot-ui/contributors')
      .then((response) => response.json())
      .then((contributors) => {
        this.setState({ contributors });
      });
  }

  renderContributors() {
    return _.map(this.state.contributors, ({
      login,
      avatar_url, // eslint-disable-line camelcase
      contributions,
    }) =>
      <Avatar
        givenName={login}
        image={avatar_url} // eslint-disable-line camelcase
        key={login}
        tooltip={`Thanks, ${login}, for your ${contributions} contribution${contributions > 1 ? 's' : ''}!`}
      />
    );
  }


  render() {
    return (
      <div className="git-contributors">
        <PageTitle title="Contributors">
          {this.state.contributors.length ?
            <small>Thanks to all <strong>{this.state.contributors.length}</strong> of our contributors!</small>
          : null }
        </PageTitle>
        <div className="avatars-container">
          {this.state.contributors.length ? this.renderContributors() : <Spinner size="medium" />}
        </div>
      </div>
    );
  }
}

export default Contributors;
