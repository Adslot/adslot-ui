import MultiPicker from 'components/adslotUi/MultiPickerComponent';
import { Avatar } from 'alexandria-adslot';
import React, { PropTypes } from 'react';

require('styles/adslotUi/UserMultiPicker.scss');

class UserMultiPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'labelFormatter',
    ]) {this[methodName] = this[methodName].bind(this);}
  }

  labelFormatter(user) {
    return (
      <div className="usermultipicker-component-user-label">
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
      <MultiPicker
        initialSelection={props.initialSelection}
        itemHeaders={props.userHeaders}
        items={props.users}
        labelFormatter={labelFormatter}
        modalApply={props.modalApply}
        modalClassName="usermultipicker-component"
        modalClose={props.modalClose}
        modalDescription={props.modalDescription}
        modalTitle={props.modalTitle}
        show={props.show}
      />
    );
  }
}

UserMultiPickerComponent.displayName = 'AdslotUiMultiPickerComponent';

const userType = PropTypes.shape({
  avatar: PropTypes.string,
  givenName: PropTypes.string,
  id: PropTypes.number.isRequired,
  surname: PropTypes.string,
});

UserMultiPickerComponent.propTypes = {
  avatarColor: PropTypes.func.isRequired,
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

UserMultiPickerComponent.defaultProps = {
  avatarColor: () => null,
  initialSelection: [],
  modalApply: () => {throw new Error('AdslotUi UserMultiPicker needs a modalApply handler');},

  modalClose: () => {throw new Error('AdslotUi UserMultiPicker needs a modalClose handler');},

  modalDescription: 'Select users.',
  modalTitle: 'Select Users',
  show: false,
  userHeaders: { left: 'Team', right: 'Member' },
  users: [],
};

export default UserMultiPickerComponent;
