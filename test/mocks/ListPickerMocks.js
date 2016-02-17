import { deepFreeze } from 'testHelpers/deepSetObjectMutability';

const labelFormatter = (item) => `${item.givenName} ${item.surname}`;

const teamMember1 = { givenName: 'John', id: 1, surname: 'Smith' };

const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };

const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };

const userHeaders = { left: 'Team', right: 'Member' };

const users = [teamMember1, teamMember2, teamMember3];

const getInitialSelection = () => [teamMember2];

const ListPickerMocks = {
  getInitialSelection,
  labelFormatter,
  teamMember1,
  teamMember2,
  userHeaders,
  users,
};

deepFreeze(ListPickerMocks);
export default ListPickerMocks;
