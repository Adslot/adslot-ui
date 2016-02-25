import ListPicker from 'components/adslotUi/ListPickerComponent';
import { Avatar, SvgSymbol } from 'alexandria-adslot';
import React, { PropTypes } from 'react';

require('styles/adslotUi/UserListPicker.scss');

class UserListPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'labelFormatter',
    ]) {this[methodName] = this[methodName].bind(this);}
  }

  labelFormatter(user) {
    return (
      <div className="userlistpicker-component-user-label">
        <Avatar
          image={user.avatar}
          color={this.props.avatarColor(user)}
          givenName={user.givenName}
          surname={user.surname}
        />
        <span>{`${user.givenName} ${user.surname}`}</span>
      </div>
    );
  }

  render() {
    const { props, labelFormatter } = this;

    return (
      <ListPicker
        allowEmptySelection={props.allowEmptySelection}
        emptyIcon={props.emptyIcon}
        emptyMessage={props.emptyMessage}
        emptySvgSymbol={props.emptySvgSymbol}
        initialSelection={props.initialSelection}
        itemHeaders={props.userHeaders}
        items={props.users}
        labelFormatter={labelFormatter}
        modalApply={props.modalApply}
        modalClassName="userlistpicker-component"
        modalClose={props.modalClose}
        modalDescription={props.modalDescription}
        modalTitle={props.modalTitle}
        show={props.show}
      />
    );
  }
}

UserListPickerComponent.displayName = 'AdslotUiListPickerComponent';

const userType = PropTypes.shape({
  avatar: PropTypes.string,
  givenName: PropTypes.string,
  id: PropTypes.number.isRequired,
  surname: PropTypes.string,
});

UserListPickerComponent.propTypes = {
  allowEmptySelection: PropTypes.bool.isRequired,
  avatarColor: PropTypes.func.isRequired,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string.isRequired,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  initialSelection: PropTypes.arrayOf(userType).isRequired,
  modalApply: PropTypes.func.isRequired,
  modalDescription: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  userHeaders: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }).isRequired,
  users: PropTypes.arrayOf(userType).isRequired,
};

UserListPickerComponent.defaultProps = {
  allowEmptySelection: false,
  avatarColor: () => null,
  emptyMessage: 'No users.',
  initialSelection: [],
  modalApply: () => {throw new Error('AdslotUi UserListPicker needs a modalApply handler');},

  modalClose: () => {throw new Error('AdslotUi UserListPicker needs a modalClose handler');},

  modalDescription: 'Select users.',
  modalTitle: 'Select Users',
  show: false,
  userHeaders: { left: 'Team', right: 'Member' },
  users: [],
};

export default UserListPickerComponent;
