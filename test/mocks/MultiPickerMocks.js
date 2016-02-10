import { deepFreeze } from 'testHelpers/deepSetObjectMutability';

const labelFormatter = (item) => `${item.givenName} ${item.surname}`;

const teamMember1 = { givenName: 'John', id: 1, surname: 'Smith' };

const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };

const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };

const itemHeaders = { left: 'Team', right: 'Member' };

const items = [teamMember1, teamMember2, teamMember3];

const MultiPickerMocks = {
  labelFormatter,
  teamMember1,
  teamMember2,
  teamMember3,
  itemHeaders,
  items,
};

deepFreeze(MultiPickerMocks);
export default MultiPickerMocks;
