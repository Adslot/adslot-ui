import 'babel-polyfill'; // for promises
import _ from 'lodash';
import mapDispatchToProps from 'examples/redux/actions';
import sinon from 'sinon';

describe('mapDispatchToProps', () => {
  it('should dispatch update with values', () => {
    const dispatchSpy = sinon.spy();
    const actions = mapDispatchToProps(dispatchSpy);
    actions.updateValues({ someField: 'Some value' });
    expect(dispatchSpy.calledWith({ type: 'update', values: { someField: 'Some value' } })).to.equal(true);
  });

  it('should set submitting state and succeed on validateAndSave', (done) => {
    const dispatchSpy = sinon.spy();
    const actions = mapDispatchToProps(dispatchSpy);
    const asyncSaveMock = actions.validateAndSave({ group: '123' });
    expect(dispatchSpy.calledWith({ type: 'submitting', isSubmitting: true })).to.equal(true);

    asyncSaveMock.then(() => {
      expect(dispatchSpy.calledWith({ type: 'submitting', isSubmitting: false })).to.equal(true);
      done();
    });
  });

  it('should set submitting state and fail on validateAndSave', (done) => {
    const dispatchSpy = sinon.spy();
    const actions = mapDispatchToProps(dispatchSpy);
    const asyncSaveMock = actions.validateAndSave({ someField: 'Some value' });
    expect(dispatchSpy.calledWith({ type: 'submitting', isSubmitting: true })).to.equal(true);

    asyncSaveMock.then(_.noop, () => {
      expect(dispatchSpy.calledWith({ type: 'submitting', isSubmitting: false })).to.equal(true);
      done();
    });
  });
});
