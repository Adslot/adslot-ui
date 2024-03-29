import immutable from 'seamless-immutable';
import React from 'react';

const labelFormatter = (item) => `${item.givenName} ${item.surname}`;

const teamMember1 = { givenName: 'John', id: 1, surname: 'Smith' };

const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };

const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };

const teamMember4 = {
  givenName: 'Jones',
  id: 'bdf9e9a6-22df-11e6-b67b-9e71128cae77',
  surname: 'Cheng',
};

const teamMember5 = {
  givenName: 'Joe',
  id: 'bdf9e9a6-22df-11e6-b67b-9e71128cae88',
  surname: 'Huang',
};

const userHeaders = { label: 'Team', toggle: 'Member' };

const nodeUserHeaders = {
  label: (
    <div className="label-container">
      <div className="left-sub-label">Group</div>
      <div className="right-sub-label">Team</div>
    </div>
  ),
  toggle: 'Member',
};

const users = [teamMember1, teamMember2, teamMember3];

const usersWithUuid = [teamMember4, teamMember5];

const getInitialSelection = () => [teamMember2];

const ListPickerMocks = immutable({
  getInitialSelection,
  labelFormatter,
  teamMember1,
  teamMember2,
  teamMember4,
  userHeaders,
  nodeUserHeaders,
  users,
  usersWithUuid,
});

export default ListPickerMocks;
