import {
  formReducer,
  visibilityReducer,
} from 'examples/redux/reducers';

describe('formReducer', () => {
  it('should return a default state on initialisation', () => {
    let state;
    expect(formReducer(state, { type: 'init' })).to.deep.equal({});
  });

  it('should update state when values passed', () => {
    const state = {};
    expect(formReducer(state, { type: 'update', values: { someField: 'someValue' } })).to.deep.equal({
      someField: 'someValue',
    });
  });

  it('should not mutate state', () => {
    const state = {};
    const myFormValues = formReducer(state, { type: 'save', formValues: { someField: 'someValue' } });
    expect(formReducer(myFormValues, { type: 'update', values: { someNewField: 'someNewValue' } })).to.deep.equal({
      someField: 'someValue',
      someNewField: 'someNewValue',
    });
    expect(myFormValues).to.deep.equal({
      someField: 'someValue',
    });
  });
});

describe('visibilityReducer', () => {
  it('should return a default state on initialisation', () => {
    let state;
    expect(visibilityReducer(state, { type: 'init' })).to.deep.equal({
      isSubmitting: false,
    });
  });

  it('should set isSubmitting visibility to true', () => {
    expect(visibilityReducer({ isSubmitting: false }, { type: 'submitting', isSubmitting: true })).to.deep.equal({
      isSubmitting: true,
    });
  });
});
