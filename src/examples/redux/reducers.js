import immutable from 'seamless-immutable';

exports.formReducer = (state = {}, action) => {
  const immutableState = immutable(state);
  switch (action.type) {
    case 'save':
      alert(JSON.stringify(action.formValues));
      return immutableState.merge(action.formValues);
    case 'update':
      return immutableState.merge(action.values);
    default:
      return immutableState;
  }
};

exports.visibilityReducer = (state = { isSubmitting: false }, action) => {
  const immutableState = immutable(state);
  switch (action.type) {
    case 'submitting':
      return immutableState.merge({ isSubmitting: action.isSubmitting });
    default:
      return immutableState;
  }
};

